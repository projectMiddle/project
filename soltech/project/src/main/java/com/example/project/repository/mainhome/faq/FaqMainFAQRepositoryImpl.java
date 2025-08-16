package com.example.project.repository.mainhome.faq;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.example.project.entity.constant.FAQCategory;
import com.example.project.entity.mainhome.MainFAQ;
import com.example.project.entity.mainhome.QMainFAQ;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPQLQuery;

public class FaqMainFAQRepositoryImpl extends QuerydslRepositorySupport implements FaqMainFAQRepository {

    public FaqMainFAQRepositoryImpl() {
        super(MainFAQ.class);
    }

    @Override
    public Page<MainFAQ> list(Pageable pageable, String category, String keyword) {

        QMainFAQ faq = QMainFAQ.mainFAQ;

        JPQLQuery<MainFAQ> query = from(faq);

        // 검색
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(faq.faqNo.gt(0));

        // 카테고리 조건
        if (category != null && !category.isEmpty()) {
            FAQCategory categoryEnum = FAQCategory.valueOf(category);
            builder.and(faq.faqCategory.eq(categoryEnum));
        }

        // 키워드 검색
        if (keyword != null && !keyword.isEmpty()) {
            builder.and(faq.faqTitle.contains(keyword).or(faq.faqContent.contains(keyword)));
        }

        query.where(builder);

        // 정렬 처리
        Sort sort = pageable.getSort();
        sort.forEach(order -> {
            Order direction = order.isAscending() ? Order.ASC : Order.DESC;
            String prop = order.getProperty();
            PathBuilder<MainFAQ> orderBuilder = new PathBuilder<>(MainFAQ.class, "mainFAQ");
            query.orderBy(new OrderSpecifier(direction, orderBuilder.get(prop)));
        });

        // 페이지네이션
        query.offset(pageable.getOffset());
        query.limit(pageable.getPageSize());
        List<MainFAQ> result = query.fetch();
        long totalCnt = from(faq).where(builder).fetchCount();

        return new PageImpl<>(result, pageable, totalCnt);
    }

}
