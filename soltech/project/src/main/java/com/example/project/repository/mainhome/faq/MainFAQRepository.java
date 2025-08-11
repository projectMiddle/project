package com.example.project.repository.mainhome.faq;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.mainhome.MainFAQ;

public interface MainFAQRepository extends JpaRepository<MainFAQ, Long>, FaqMainFAQRepository {

}
