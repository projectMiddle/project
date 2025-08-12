package com.example.project.dto.note;

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
public class NoteSendDTO {

    private List<Long> receiverIds;

    private String noteTitle;

    private String noteContent;

    private List<MultipartFile> attachments;

}
