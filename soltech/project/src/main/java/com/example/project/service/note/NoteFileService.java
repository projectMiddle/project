package com.example.project.service.note;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.note.NoteAttachmentDTO;

@Transactional

public interface NoteFileService {
    // 첨부파일 저장 + DB 저장
    List<NoteAttachmentDTO> saveFiles(Long noteNo, List<MultipartFile> noteUploadFiles);

    // 첨부파일 삭제 + DB 삭제
    public void deleteFile(String noteFileName);

    List<String> findFileNamesByNoteNo(Long noteNo);

    Resource loadFileAsResource(Long noteNo, String fileName);
}
