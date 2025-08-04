package com.example.project.repository.note;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.note.NoteAttachment;

public interface NoteAttachmentRepository extends JpaRepository<NoteAttachment, Long> {

    void deleteByNoteFileUuidAndNoteFileNameAndNoteFilePath(String uuid, String noteFileName, String noteFilePath);

    List<NoteAttachment> findByNoteSend_NoteSendNo(Long noteSendNo);

    List<NoteAttachment> findByNoteReceive_NoteReceiveNo(Long noteReceiveNo);

}
