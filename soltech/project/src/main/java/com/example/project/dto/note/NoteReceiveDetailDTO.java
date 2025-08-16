package com.example.project.dto.note;

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
public class NoteReceiveDetailDTO {
    private Long noteReceiveNo;
    private String noteTitle;
    private String noteContent;
    private LocalDateTime noteReceiveDate;

    private UserInfoDTO sender;

    private List<NoteAttachmentDTO> attachments;

}
