package com.example.project.dto.mail;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import com.example.project.entity.mail.MailAttachment;
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
public class MailAttachmentDTO {

    private Long mailNo;
    private String mailFileName;
    private String mailFilePath;
    private String mailFileUuid;

    public String getDownloadURL() {
        try {
            return URLEncoder.encode("/mail/" + mailFilePath + "/" + mailFileUuid + "_" + mailFileName, "UTF-8");

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "";
        }
    }

    public MailAttachmentDTO(MailAttachment attachment) {
        this.mailNo = attachment.getMailAttachmentNo();
        this.mailFileName = attachment.getMailFileName();
        this.mailFilePath = attachment.getMailFilePath();
        this.mailFileUuid = attachment.getMailFileUuid();
    }

}
