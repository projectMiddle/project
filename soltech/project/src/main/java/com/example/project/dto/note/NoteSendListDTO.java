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
public class NoteSendListDTO {
    private Long noteSendNo;
    private String noteTitle;
    private LocalDateTime noteSendDate;

    private String targetName;

}
