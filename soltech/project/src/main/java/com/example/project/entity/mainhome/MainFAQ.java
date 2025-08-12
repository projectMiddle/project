package com.example.project.entity.mainhome;

import com.example.project.entity.Employee;
import com.example.project.entity.constant.FAQCategory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString(exclude = "empNo")
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "MAIN_FAQ")
@Entity
public class MainFAQ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long faqNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FAQ_EMP_NO", nullable = false)
    private Employee empNo;

    @Column(nullable = false)
    private String faqTitle;

    @Column(nullable = false, length = 2000)
    private String faqContent;

    @Enumerated(EnumType.STRING)
    private FAQCategory faqCategory;

}
