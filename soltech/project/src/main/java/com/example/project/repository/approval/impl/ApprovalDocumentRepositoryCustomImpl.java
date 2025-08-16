package com.example.project.repository.approval.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.example.project.entity.approval.ApprovalDocument;
import com.example.project.entity.approval.QApprovalDocument;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;

public class ApprovalDocumentRepositoryCustomImpl extends QuerydslRepositorySupport
        implements ApprovalDocumentRepositoryCustom {

    public ApprovalDocumentRepositoryCustomImpl() {
        super(ApprovalDocument.class);
    }

    QApprovalDocument doc = QApprovalDocument.approvalDocument;

    @Override
    public Page<ApprovalDocument> findDocsWithUrgentSorted(Long empNo, String status, Pageable pageable) {

        BooleanExpression baseCondition = doc.empNo.empNo.eq(empNo)
                .and(doc.appIsTemporary.isFalse());

        if ("enforced".equalsIgnoreCase(status)) {
            baseCondition = baseCondition.and(doc.appIsFinalized.isTrue());
        }

        JPQLQuery<ApprovalDocument> query = from(doc)
                .where(baseCondition)
                .orderBy(doc.appIsUrgent.desc(), doc.appDocNo.desc());

        List<ApprovalDocument> content = getQuerydsl().applyPagination(pageable, query).fetch();
        long total = query.fetchCount();

        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public Page<ApprovalDocument> findDocsForReceiveSorted(List<Long> appDocNos, Pageable pageable) {

        JPQLQuery<ApprovalDocument> query = from(doc)
                .where(doc.appDocNo.in(appDocNos)
                        .and(doc.appIsTemporary.isFalse()))
                .orderBy(doc.appIsUrgent.desc(), doc.appDocNo.desc());

        List<ApprovalDocument> content = getQuerydsl().applyPagination(pageable, query).fetch();
        long total = query.fetchCount();

        return new PageImpl<>(content, pageable, total);
    }

}
