package com.example.project.entity.board;

import java.time.LocalDateTime;

import org.hibernate.persister.collection.mutation.AbstractUpdateRowsCoordinator;
import org.springframework.data.annotation.CreatedDate;

import com.example.project.entity.Department;
import com.example.project.entity.Employee;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString(exclude = { "deptNo", "empNo" })
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AbstractUpdateRowsCoordinator.class)
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notiNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTI_EMP_NO", nullable = false)
    private Employee empNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTI_DEPT_NO", nullable = false)
    private Department deptNo;

    @Column(nullable = false)
    private String notiTitle;

    @Column(nullable = false)
    private String notiContent;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime notiRegDate;

    private LocalDateTime notiUpdateDate;

    public void changeNotiContent(String notiContent) {
        this.notiContent = notiContent;
        this.notiUpdateDate = LocalDateTime.now();
    }

    public void changeNotiUpdateDate(LocalDateTime updateDate) {
        this.notiUpdateDate = updateDate;
    }

}
