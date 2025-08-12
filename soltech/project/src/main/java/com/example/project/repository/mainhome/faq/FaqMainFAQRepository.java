package com.example.project.repository.mainhome.faq;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.project.entity.mainhome.MainFAQ;

public interface FaqMainFAQRepository {

    // 페이지 + 검색
    Page<MainFAQ> list(Pageable pageable, String category, String keyword);

}
