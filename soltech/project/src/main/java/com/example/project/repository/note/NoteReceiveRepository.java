package com.example.project.repository.note;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.note.NoteReceive;

public interface NoteReceiveRepository extends JpaRepository<NoteReceive, Long> {
    List<NoteReceive> findByReceiver_EmpNoAndNoteDeleteFalseOrderByNoteReceiveNoDesc(Long receiverEmpNo);

    List<NoteReceive> findByNoteSendNo(Long noteSendNo);

    List<NoteReceive> findByReceiver_EmpNoAndNoteDeleteTrue(Long empNo);
}