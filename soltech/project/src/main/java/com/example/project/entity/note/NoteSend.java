package com.example.project.entity.note;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.example.project.entity.Employee;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString(exclude = "sender")
@AllArgsConstructor
@NoArgsConstructor

@EntityListeners(AuditingEntityListener.class)
@Entity

// 송신자, 제목, 내용, 날짜, 삭제여부
public class NoteSend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noteSendNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTE_SENDER_NO", nullable = false)
    private Employee sender;

    @Column(length = 200, nullable = false)
    private String noteTitle;

    // string -> 기본적으로 255자제한 -> 초과 가능성있음 -> @Lob사용 or columnDefinition = "TEXT"
    @Lob
    @Column(nullable = false)
    private String noteContent;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime noteSendDate;
    @OneToMany(mappedBy = "noteSend", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NoteAttachment> attachments = new ArrayList<>();

    // 삭제 추가
    @Column(nullable = false)
    private boolean noteDelete;

    public void changeNoteDelete(boolean noteDelete) {
        this.noteDelete = noteDelete;
    }

}
