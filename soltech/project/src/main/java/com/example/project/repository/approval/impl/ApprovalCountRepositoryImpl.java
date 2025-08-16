package com.example.project.repository.approval.impl;

import java.util.HashMap;
import java.util.Map;

import com.example.project.entity.Employee;
import com.example.project.entity.approval.AppProcessing;
import com.example.project.entity.approval.QAppProcessing;
import com.example.project.entity.approval.QApprovalDocument;
import com.example.project.entity.constant.AppRoleType;
import com.example.project.entity.constant.AppStatus;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class ApprovalCountRepositoryImpl extends QuerydslRepositorySupport implements ApprovalCountRepository {

        public ApprovalCountRepositoryImpl() {
                super(AppProcessing.class); // ✅ 기본 생성자
        }

        @Override
        public Map<String, Long> countApprovalStatusByEmpNo(Long empNo) {
                QAppProcessing appProcessing = QAppProcessing.appProcessing;
                QAppProcessing subApp = new QAppProcessing("subApp");
                QApprovalDocument doc = QApprovalDocument.approvalDocument;

                // 1. 수신결재
                JPQLQuery<Long> listQuery = from(appProcessing)
                                .select(appProcessing.count())
                                .where(
                                                appProcessing.empNo.eq(Employee.builder().empNo(empNo).build()),
                                                appProcessing.appStatus.eq(AppStatus.PENDING),
                                                appProcessing.appRoleType.ne(AppRoleType.REFERENCE));

                Long listCount = listQuery.fetchOne();

                // 2. 결재내역
                JPQLQuery<Long> historyQuery = from(appProcessing)
                                .select(appProcessing.count())
                                .where(
                                                appProcessing.empNo.eq(Employee.builder().empNo(empNo).build()),
                                                appProcessing.appStatus.in(AppStatus.APPROVED, AppStatus.REJECTED),
                                                appProcessing.appRoleType.ne(AppRoleType.REFERENCE));

                Long historyCount = historyQuery.fetchOne();

                // 3. 수신참조
                JPQLQuery<Long> subquery = from(subApp)
                                .select(subApp.appDocNo.appDocNo)
                                .where(
                                                subApp.appOrder.eq(
                                                                JPAExpressions.select(subApp.appOrder.max())
                                                                                .from(subApp)
                                                                                .where(subApp.appDocNo.eq(
                                                                                                appProcessing.appDocNo))),
                                                subApp.appStatus.eq(AppStatus.APPROVED));

                JPQLQuery<Long> referenceQuery = from(appProcessing)
                                .select(appProcessing.count())
                                .where(
                                                appProcessing.empNo.eq(Employee.builder().empNo(empNo).build()),
                                                appProcessing.appRoleType.eq(AppRoleType.REFERENCE),
                                                appProcessing.appDocNo.appDocNo.notIn(subquery));

                Long referenceCount = referenceQuery.fetchOne();

                // 4. 임시저장 문서
                JPQLQuery<Long> temporaryQuery = from(doc)
                                .select(doc.count())
                                .where(
                                                doc.empNo.empNo.eq(empNo),
                                                doc.appIsTemporary.isTrue());
                Long temporaryCount = temporaryQuery.fetchOne();

                // 5. 회수 문서
                JPQLQuery<Long> retrievedQuery = from(appProcessing)
                                .select(appProcessing.appDocNo.countDistinct())
                                .where(
                                                appProcessing.empNo.empNo.eq(empNo),
                                                appProcessing.appStatus.eq(AppStatus.RETRIEVED));
                Long retrievedCount = retrievedQuery.fetchOne();

                // 6. 시행 문서
                JPQLQuery<Long> enforcedQuery = from(doc)
                                .select(doc.count())
                                .where(
                                                doc.empNo.empNo.eq(empNo),
                                                doc.appIsFinalized.isTrue());

                Long enforcedCount = enforcedQuery.fetchOne();

                log.info("결재 카운트 - empNo: {}, 수신결재: {}, 결재내역: {}, 수신참조: {}, 임시저장: {}, 회수: {}, 시행: {}",
                                empNo, listCount, historyCount, referenceCount, temporaryCount, retrievedCount,
                                enforcedCount);

                Map<String, Long> result = new HashMap<>();
                result.put("list", listCount != null ? listCount : 0L);
                result.put("history", historyCount != null ? historyCount : 0L);
                result.put("reference", referenceCount != null ? referenceCount : 0L);
                result.put("temporary", temporaryCount != null ? temporaryCount : 0L);
                result.put("retrieved", retrievedCount != null ? retrievedCount : 0L);
                result.put("enforced", enforcedCount != null ? enforcedCount : 0L);

                return result;
        }
}
