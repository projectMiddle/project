package com.example.project.dto.mail;

import java.time.LocalDateTime;
import java.util.List;

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
public class MailSendDetailDTO {
    private Long mailNo;
    private String mailTitle;
    private String mailContent;
    private LocalDateTime mailSendDate;

    private List<UserInfo> receivers;
    private List<AttachInfoDTO> attachments;

}
