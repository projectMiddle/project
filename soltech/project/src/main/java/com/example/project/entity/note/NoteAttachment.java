package com.example.project.entity.note;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor

@Entity
@EntityListeners(AuditingEntityListener.class)
public class NoteAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noteAttachmentNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTE_SEND_NO", nullable = true)
    private NoteSend noteSend;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTE_RECEIVE_NO", nullable = true)
    private NoteReceive noteReceive;

    @Column(nullable = false)
    private String noteFileName;
    @Column(nullable = false)
    private String noteFilePath;
    @Column(nullable = false)
    private String noteFileUuid;
    @Column(nullable = false)
    private Long noteFileSize;

    @CreatedDate
    private LocalDateTime noteUploadDate;

    public void updateFileInfo(String fileName, String filePath, String uuid) {
        this.noteFileName = fileName;
        this.noteFilePath = filePath;
        this.noteFileUuid = uuid;
    }

    public void changeNoteNo(NoteSend nno) {
        this.noteSend = nno;
    }
}
