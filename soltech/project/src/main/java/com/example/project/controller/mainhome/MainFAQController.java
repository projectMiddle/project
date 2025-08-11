package com.example.project.controller.mainhome;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.PageRequestDTO;
import com.example.project.dto.PageResultDTO;
import com.example.project.dto.mainhome.MainFAQDTO;
import com.example.project.service.mainhome.MainFAQService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/faq")
@RequiredArgsConstructor
@Log4j2
public class MainFAQController {

    private final MainFAQService mainFAQService;

    @GetMapping("")
    public ResponseEntity<PageResultDTO<MainFAQDTO>> getMethodName(PageRequestDTO pageRequestDTO) {
        log.info("faq 요청 : {}", pageRequestDTO);

        return ResponseEntity.ok(mainFAQService.getList(pageRequestDTO));
    }

}
