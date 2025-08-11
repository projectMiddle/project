package com.example.project.repository;

import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.project.entity.Employee;
import com.example.project.entity.constant.FAQCategory;
import com.example.project.entity.mainhome.MainFAQ;
import com.example.project.repository.mainhome.faq.MainFAQRepository;

@SpringBootTest
public class MainHomeRepositoryTest {

    @Autowired
    private MainFAQRepository mainFAQRepository;

    @Test
    public void createTest() {

        // IntStream.rangeClosed(1, 20).forEach(i -> {
        // MainFAQ faq = MainFAQ.builder()
        // .empNo(Employee.builder().empNo(1001L).build())
        // .faqTitle("자주 묻는 질문" + i)
        // .faqContent("자주 묻는 질문 내용 테스트" + i)
        // .faqCategory(FAQCategory.FREQUNET_Q)
        // .build();
        // mainFAQRepository.save(faq);
        // });

        // IntStream.rangeClosed(1, 20).forEach(i -> {
        // MainFAQ faq = MainFAQ.builder()
        // .empNo(Employee.builder().empNo(1001L).build())
        // .faqTitle("홈페이지 이용 test" + i)
        // .faqContent("홈페이지 이용 test content" + i)
        // .faqCategory(FAQCategory.USEHOMPAGE_Q)
        // .build();
        // mainFAQRepository.save(faq);
        // });

        // IntStream.rangeClosed(1, 20).forEach(i -> {
        // MainFAQ faq = MainFAQ.builder()
        // .empNo(Employee.builder().empNo(1001L).build())
        // .faqTitle("지원자격 test" + i)
        // .faqContent("지원자격 질문 내용 테스트" + i)
        // .faqCategory(FAQCategory.REQUIREMENT_Q)
        // .build();
        // mainFAQRepository.save(faq);
        // });

        // IntStream.rangeClosed(1, 500).forEach(i -> {
        // MainFAQ faq = MainFAQ.builder()
        // .empNo(Employee.builder().empNo(1001L).build())
        // .faqTitle("인턴실습 test" + i)
        // .faqContent("인턴실습 질문 내용 테스트" + i)
        // .faqCategory(FAQCategory.REQUIREMENT_Q)
        // .build();
        // mainFAQRepository.save(faq);
        // });

    }

}
