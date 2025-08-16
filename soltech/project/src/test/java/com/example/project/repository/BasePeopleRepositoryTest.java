package com.example.project.repository;

import java.time.LocalDate;
import java.time.Month;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.project.entity.Department;
import com.example.project.entity.Employee;
import com.example.project.entity.JobRank;
import com.example.project.entity.constant.Gender;
import com.example.project.entity.constant.JobNo;
import com.example.project.entity.constant.MemberRole;

@SpringBootTest
public class BasePeopleRepositoryTest {

        @Autowired
        private EmployeeRepository employeeRepository;
        @Autowired
        private PasswordEncoder passwordEncoder;

        @Test
        public void peopleInsert() {

                Employee jae = Employee.builder()
                                .empNo(1001L)
                                .eName("정용재")
                                .eGender(Gender.MALE)
                                .eBirthday(LocalDate.of(1999, Month.MARCH, 03))
                                .eEmail("yongjae@soltech.co.kr")
                                .eAddress("서울특별시 영등포구")
                                .eMobile("010-9733-6605")
                                .eAccount("110-999-999999")
                                .ePassword(passwordEncoder.encode("6605"))
                                .eHiredate(LocalDate.of(2018, Month.MAY, 11))
                                .eSalary(213000000L)
                                .eMemberRole(MemberRole.EMPLOYEE)
                                .deptNo(Department.builder().deptNo(201L).build())
                                .jobNo(JobRank.builder().jobNo(JobNo.AD_MGR).build())
                                .build();
                employeeRepository.save(jae);

                Employee dong = Employee.builder()
                                .empNo(1002L)
                                .eName("정동진")
                                .eGender(Gender.MALE)
                                .eBirthday(LocalDate.of(1997, Month.MARCH, 03))
                                .eEmail("dongjin@soltech.co.kr")
                                .eAddress("부산광역시 해운대구")
                                .eMobile("010-8213-1159")
                                .eAccount("110-999-999999")
                                .ePassword(passwordEncoder.encode("1159"))
                                .eHiredate(LocalDate.of(2018, Month.MAY, 11))
                                .eSalary(210000000L)
                                .eMemberRole(MemberRole.EMPLOYEE)
                                .deptNo(Department.builder().deptNo(201L).build())
                                .jobNo(JobRank.builder().jobNo(JobNo.AD_MGR).build())
                                .build();
                employeeRepository.save(dong);

                Employee yong = Employee.builder()
                                .empNo(1003L)
                                .eName("이용성")
                                .eGender(Gender.MALE)
                                .eBirthday(LocalDate.of(1993, Month.OCTOBER, 25))
                                .eEmail("yongsung@soltech.co.kr")
                                .eAddress("서울특별시 강서구")
                                .eMobile("010-7129-7318")
                                .eAccount("110-999-999999")
                                .ePassword(passwordEncoder.encode("7318"))
                                .eHiredate(LocalDate.of(2018, Month.MAY, 11))
                                .eSalary(208000000L)
                                .eMemberRole(MemberRole.EMPLOYEE)
                                .deptNo(Department.builder().deptNo(201L).build())
                                .jobNo(JobRank.builder().jobNo(JobNo.AD_MGR).build())
                                .build();
                employeeRepository.save(yong);

                Employee mi = Employee.builder()
                                .empNo(1004L)
                                .eName("장미경")
                                .eGender(Gender.FEMALE)
                                .eBirthday(LocalDate.of(2002, Month.JULY, 31))
                                .eEmail("miaOwO@soltech.co.kr")
                                .eAddress("경기도 성남시")
                                .eMobile("010-8276-4087")
                                .eAccount("110-999-999999")
                                .ePassword(passwordEncoder.encode("4087"))
                                .eHiredate(LocalDate.of(2018, Month.MAY, 11))
                                .eSalary(210000000L)
                                .eMemberRole(MemberRole.EMPLOYEE)
                                .deptNo(Department.builder().deptNo(201L).build())
                                .jobNo(JobRank.builder().jobNo(JobNo.AD_MGR).build())
                                .build();
                employeeRepository.save(mi);

                Employee byeoung = Employee.builder()
                                .empNo(1005L)
                                .eName("박병선")
                                .eGender(Gender.MALE)
                                .eBirthday(LocalDate.of(1999, Month.OCTOBER, 31))
                                .eEmail("byeoungsun@soltech.co.kr")
                                .eAddress("서울특별시 은평구")
                                .eMobile("010-4605-8459")
                                .eAccount("110-999-999999")
                                .ePassword(passwordEncoder.encode("8459"))
                                .eHiredate(LocalDate.of(2018, Month.MAY, 11))
                                .eSalary(205000000L)
                                .eMemberRole(MemberRole.EMPLOYEE)
                                .deptNo(Department.builder().deptNo(201L).build())
                                .jobNo(JobRank.builder().jobNo(JobNo.AD_MGR).build())
                                .build();
                employeeRepository.save(byeoung);

                Employee chan = Employee.builder()
                                .empNo(1006L)
                                .eName("신승찬")
                                .eGender(Gender.MALE)
                                .eBirthday(LocalDate.of(2005, Month.JULY, 31))
                                .eEmail("seungchan@soltech.co.kr")
                                .eAddress("강원도 인제군")
                                .eMobile("010-5571-2417")
                                .eAccount("110-999-999999")
                                .ePassword(passwordEncoder.encode("2417"))
                                .eHiredate(LocalDate.of(2018, Month.MAY, 11))
                                .eSalary(200000000L)
                                .eMemberRole(MemberRole.EMPLOYEE)
                                .deptNo(Department.builder().deptNo(201L).build())
                                .jobNo(JobRank.builder().jobNo(JobNo.AD_MGR).build())
                                .build();
                employeeRepository.save(chan);

        }

}
