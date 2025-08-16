package com.example.project.service.mainhome;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.project.dto.PageRequestDTO;
import com.example.project.dto.PageResultDTO;
import com.example.project.dto.mainhome.MainJobsDTO;
import com.example.project.entity.Employee;
import com.example.project.entity.mainhome.MainJobs;
import com.example.project.repository.mainhome.MainJobsRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Service
@Log4j2
public class MainJobsService {

    private final MainJobsRepository mainJobsRepository;

    // 생성
    public Long jobsInsert(MainJobsDTO dto) {
        log.info("생성 요청 : {}", dto);

        MainJobs job = MainJobs.builder()
                .empNo(Employee.builder().empNo(dto.getEmpNo()).build())
                .jobsTitle(dto.getJobsTitle())
                .jobsContent(dto.getJobsContent())
                .build();

        MainJobs result = mainJobsRepository.save(job);

        return result.getJobsNo();
    }

    // 수정
    public Long jobsUpdate(MainJobsDTO dto) {
        log.info("수정 요청 : {}", dto);
        MainJobs job = mainJobsRepository.findById(dto.getJobsNo()).get();
        job.changeJobsTitle(dto.getJobsTitle());
        job.changeJobsContent(dto.getJobsContent());
        mainJobsRepository.save(job);
        return job.getJobsNo();
    }

    // 삭제
    public void jobsDelete(Long jobsNo) {
        log.info("삭제 요청 : {}", jobsNo);
        mainJobsRepository.deleteById(jobsNo);
    }

    // 리스트 요청
    public PageResultDTO<MainJobsDTO> getList(PageRequestDTO dto) {
        log.info("리스트 요청 : {}", dto);

        Pageable pageable = PageRequest.of(dto.getPage() - 1, dto.getSize(),
                Sort.by("jobsNo").descending());

        Page<MainJobs> result = mainJobsRepository.findAll(pageable);

        List<MainJobsDTO> dtoList = result.get().map(job -> entityToDto(job, job.getEmpNo()))
                .collect(Collectors.toList());

        long totalCnt = result.getTotalElements();

        return PageResultDTO.<MainJobsDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(dto)
                .totalCount(totalCnt)
                .build();
    }

    @Transactional
    public MainJobsDTO getRow(Long jobsNo) {
        log.info("상세 조회 요청 : {}", jobsNo);

        MainJobs job = mainJobsRepository.findById(jobsNo)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));

        Employee employee = job.getEmpNo();

        return entityToDto(job, employee);
    }

    private MainJobsDTO entityToDto(MainJobs job, Employee employee) {

        MainJobsDTO dto = MainJobsDTO.builder()
                .jobsNo(job.getJobsNo())
                .empNo(employee.getEmpNo())
                .jobsTitle(job.getJobsTitle())
                .jobsContent(job.getJobsContent())
                .jobsRegDate(job.getJobsRegDate())
                .build();

        return dto;
    }

}
