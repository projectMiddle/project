package com.example.project.dto.mail;
// 보낸 메일 목록

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
public class MailSendListDTO {
    private Long mailNo;
    private String mailTitle;
    private LocalDateTime mailSendDate;
    private List<UserInfo> receivers;

}
