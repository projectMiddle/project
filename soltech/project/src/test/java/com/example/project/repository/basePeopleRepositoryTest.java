package com.example.project.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.project.entity.Department;
import com.example.project.entity.JobRank;
import com.example.project.entity.constant.JobNo;

@SpringBootTest
public class basePeopleRepositoryTest {

    @Autowired
    private JobRankRepository jobRankRepository;
    @Autowired
    private DepartmentRepository departmentRepository;

    @Test
    public void insertJobRankTest() {

        JobRank jobRank = JobRank.builder()
                .jobNo(JobNo.AD_MGR)
                .jobName("본부장")
                .jobDiscount(0.3d)
                .build();
        jobRankRepository.save(jobRank);

        jobRank = JobRank.builder()
                .jobNo(JobNo.ASSI_MGR)
                .jobName("부장")
                .jobDiscount(0.25d)
                .build();
        jobRankRepository.save(jobRank);

        jobRank = JobRank.builder()
                .jobNo(JobNo.AD_AM)
                .jobName("과장")
                .jobDiscount(0.2d)
                .build();
        jobRankRepository.save(jobRank);

        jobRank = JobRank.builder()
                .jobNo(JobNo.AM)
                .jobName("대리")
                .jobDiscount(0.15d)
                .build();
        jobRankRepository.save(jobRank);

        jobRank = JobRank.builder()
                .jobNo(JobNo.JM)
                .jobName("주임")
                .jobDiscount(0.1d)
                .build();
        jobRankRepository.save(jobRank);

        jobRank = JobRank.builder()
                .jobNo(JobNo.NM)
                .jobName("사원")
                .jobDiscount(0.05d)
                .build();
        jobRankRepository.save(jobRank);

    }

    @Test
    public void insertDepartmentTest() {
        Department department = Department.builder()
                .deptNo(101L)
                .deptName("세무팀")
                .deptPhone("110, 111")
                .build();
        departmentRepository.save(department);

        department = Department.builder()
                .deptNo(201L)
                .deptName("인사팀")
                .deptPhone("216, 217")
                .build();
        departmentRepository.save(department);

        department = Department.builder()
                .deptNo(301L)
                .deptName("지원팀")
                .deptPhone("302, 303, 305")
                .build();
        departmentRepository.save(department);

        department = Department.builder()
                .deptNo(401L)
                .deptName("마케팅팀")
                .deptPhone("423, 424, 425, 426")
                .build();
        departmentRepository.save(department);

        department = Department.builder()
                .deptNo(501L)
                .deptName("영업팀")
                .deptPhone("501, 502, 503, 504, 511, 512")
                .build();
        departmentRepository.save(department);

    }

}
