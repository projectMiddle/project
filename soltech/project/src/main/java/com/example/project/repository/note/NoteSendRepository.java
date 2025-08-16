package com.example.project.repository.note;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.note.NoteSend;

public interface NoteSendRepository extends JpaRepository<NoteSend, Long> {
    List<NoteSend> findBySender_EmpNoAndNoteDeleteFalseOrderByNoteSendNoDesc(Long senderEmpNo);

    List<NoteSend> findBySender_EmpNoAndNoteDeleteTrueOrderByNoteSendNoDesc(Long senderEmpNo);

}
