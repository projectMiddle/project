package com.example.project.dto.mail;

// 메일 작성
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class MailSendDTO {

    private List<Long> receiverIds;
    private String mailTitle;
    private String mailContent;

    // 첨부파일
    private MultipartFile[] attachments;

}
