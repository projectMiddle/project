package com.example.project.dto.note;

import java.time.LocalDateTime;

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
public class NoteTrashDTO {
    private Long id;
    private String noteTitle;
    private String noteType;
    private String targetName;
    private LocalDateTime date;
}