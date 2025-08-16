package com.example.project.entity.note;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString(exclude = "receiver")
@AllArgsConstructor
@NoArgsConstructor // jpa 리플렉션(자바 자가진단 기능) -> 기본생성자 필요
// 수신자, 제목, 내용, 날짜, 읽음여부, 삭제여부, 보낸쪽지번호
@Entity
public class NoteReceive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noteReceiveNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTE_RECEIVER_NO", nullable = false)
    private Employee receiver;

    @Column(length = 200, nullable = false)
    private String noteTitle;

    // string -> 기본적으로 255자제한 -> 초과 가능성있음 -> @Lob사용 or columnDefinition = "TEXT"
    @Lob
    @Column(nullable = false)
    private String noteContent;

    @Column(nullable = false)
    private LocalDateTime noteReceiveDate;

    @Column(nullable = false)
    private boolean noteRead;

    @Column(nullable = false)
    private Long noteSendNo;

    @Column(nullable = false)
    private String senderName;

    @Column(nullable = false)
    private String senderDept;

    @Column(nullable = false)
    private Long senderEmpNo;

    @OneToMany(mappedBy = "noteReceive", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NoteAttachment> attachments = new ArrayList<>();

    @Column(nullable = false)
    private boolean noteDelete;

    public void changeNoteRead(boolean noteRead) {

        this.noteRead = noteRead;

    }

    public void changeNoteDelete(boolean noteDelete) {
        this.noteDelete = noteDelete;
    }
}
