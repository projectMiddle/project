package com.example.project.dto.note;

import com.example.project.entity.note.NoteAttachment;

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
public class NoteAttachmentDTO {
    private Long noteAttachmentNo;
    private String noteFileName;
    private String noteFileUuid;
    private String noteFilePath;

    public static NoteAttachmentDTO from(NoteAttachment entity) {
        return NoteAttachmentDTO.builder()
                .noteAttachmentNo(entity.getNoteAttachmentNo())
                .noteFileName(entity.getNoteFileName())
                .noteFileUuid(entity.getNoteFileUuid())
                .noteFilePath(entity.getNoteFilePath())
                .build();
    }

}
