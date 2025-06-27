package com.example.project.dto.mail;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import com.example.project.entity.mail.MailAttachment;

import lombok.AllArgsConstructor;

@AllArgsConstructor 
public class AttachInfoDTO {
    private String mailFileName;   // 보여줄 원본 이름
    private String downloadUrl;    // 프론트에서 바로 쓸 수 있는 다운로드 링크
    private int mailFileSize;      // 크기

    public static AttachInfoDTO from(MailAttachment entity) {
        try {
            String url = URLEncoder.encode("/upload/" + entity.getMailFilePath() + "/" +
                    entity.getMailFileUuid() + "_" + entity.getMailFileName(), "UTF-8");

            return new AttachInfoDTO(
                entity.getMailFileName(),
                url,
                (int) entity.getMailFileSize()
            );
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("URL 인코딩 실패", e);
        }
    }
}


