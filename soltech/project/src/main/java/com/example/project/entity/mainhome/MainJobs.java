package com.example.project.entity.mainhome;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.example.project.entity.Employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
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

@Table(name = "MAIN_JOBS")
@Entity
@EntityListeners(AuditingEntityListener.class)
public class MainJobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobsNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "JOBS_EMP_NO", nullable = false)
    private Employee empNo;

    @Column(nullable = false)
    private String jobsTitle;

    @Column(nullable = false, length = 2000)
    private String jobsContent;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime jobsRegDate;

    public void changeJobsTitle(String jobsTitle) {
        this.jobsTitle = jobsTitle;
    }

    public void changeJobsContent(String jobsContent) {
        this.jobsContent = jobsContent;
    }
    
}
