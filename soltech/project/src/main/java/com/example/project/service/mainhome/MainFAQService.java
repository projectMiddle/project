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
import com.example.project.dto.mainhome.MainFAQDTO;
import com.example.project.entity.Employee;
import com.example.project.entity.mainhome.MainFAQ;
import com.example.project.repository.mainhome.faq.MainFAQRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Service
@Log4j2
public class MainFAQService {

        private final MainFAQRepository mainFAQRepository;

        public PageResultDTO<MainFAQDTO> getList(PageRequestDTO dto) {
                log.info("리스트 요청 dto : {}", dto);

                Pageable pageable = PageRequest.of(dto.getPage() - 1, dto.getSize(),
                                Sort.by("faqNo").descending());

                Page<MainFAQ> result = mainFAQRepository.list(pageable,
                                dto.getCategory(), dto.getKeyword());

                List<MainFAQDTO> dtoList = result.get().map(faq -> entityToDto(faq,
                                faq.getEmpNo()))
                                .collect(Collectors.toList());

                long totalCnt = result.getTotalElements();

                return PageResultDTO.<MainFAQDTO>withAll()
                                .dtoList(dtoList)
                                .pageRequestDTO(dto)
                                .totalCount(totalCnt)
                                .build();

        }

        private MainFAQDTO entityToDto(MainFAQ faq, Employee employee) {

                MainFAQDTO dto = MainFAQDTO.builder()
                                .faqNo(faq.getFaqNo())
                                .empNo(employee.getEmpNo())
                                .eName(employee.getEName())
                                .deptName(employee.getDeptNo().getDeptName())
                                .faqTitle(faq.getFaqTitle())
                                .faqContent(faq.getFaqContent())
                                .faqCategory(faq.getFaqCategory())
                                .build();

                return dto;

        }

}
