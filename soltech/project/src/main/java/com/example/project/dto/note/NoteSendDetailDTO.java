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
public class NoteSendDetailDTO {
    private Long noteSendNo;
    private String noteTitle;
    private String noteContent;
    private LocalDateTime noteSendDate;

    private List<UserInfoDTO> receivers;

    private List<NoteAttachmentDTO> attachments;

}
