package com.example.project.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.example.project.dto.PageRequestDTO;
import com.example.project.dto.PageResultDTO;
import com.example.project.dto.board.NoticeDTO;
import com.example.project.entity.Department;
import com.example.project.entity.Employee;
import com.example.project.entity.board.Notice;
import com.example.project.repository.board.NoticeRepository;
import com.example.project.service.board.NoticeService;

@SpringBootTest
public class NoticeRepositoryTest {

    // @Autowired
    // private NoticeRepository noticeRepository;

    // @Autowired
    // private NoticeService noticeService;

    @Test
    // insert 데이터 삽입
    public void insertTest() {
        IntStream.rangeClosed(1, 50).forEach(i -> {
            Notice notice = Notice.builder()
                    .empNo(Employee.builder().empNo(1006L).build())
                    .deptNo(Department.builder().deptNo(201L).build())
                    .notiTitle("Test" + i)
                    .notiContent("Test" + i)
                    .notiRegDate(LocalDateTime.now())
                    .build();
            noticeRepository.save(notice);
        });
    }

    // @Test
    // // 데이터 단컨 조회
    // public void readTest() {
    // Notice notice = noticeRepository.findById(2L).get();
    // System.out.println(notice);
    // }

    // @Test
    // public void testpage() {
    // // 1페이지, 10개씩 보기 요청
    // PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
    // .page(1)
    // .size(10)
    // .build();

    // // 서비스 호출
    // PageResultDTO<NoticeDTO> result = noticeService.readAll(pageRequestDTO);

    // // 결과 출력
    // System.out.println("총 게시물 수: " + result.getTotalCount());
    // System.out.println("페이지 목록:" + result.getTotalPage());

    // for (NoticeDTO dto : result.getDtoList()) {
    // System.out.println(dto);
    // }
    // }

    // @Test
    // // 전체 조회
    // public void testList() {
    // noticeRepository.findAll().forEach(notice -> System.out.println(notice));
    // }

    // @Test
    // // 내용 수정
    // public void contentUpdate() {
    // Notice notice = noticeRepository.findById(12L).get();
    // notice.changeNotiContent("내용수정");
    // noticeRepository.save(notice);
    // }

    // @Test
    // public void testDelete() {
    // noticeRepository.deleteById(2L);
    // }
}
