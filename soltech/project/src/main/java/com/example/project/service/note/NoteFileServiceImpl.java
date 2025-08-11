package com.example.project.service.note;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.note.NoteAttachmentDTO;
import com.example.project.entity.note.NoteAttachment;
import com.example.project.entity.note.NoteSend;
import com.example.project.repository.note.NoteAttachmentRepository;
import com.example.project.repository.note.NoteSendRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class NoteFileServiceImpl implements NoteFileService {

    private final NoteAttachmentRepository noteAttachmentRepository;
    private final NoteSendRepository noteSendRepository;
    private final String uploadBasePath = "C:/project/soltech/project/note";

    @Override
    @Transactional
    public List<NoteAttachmentDTO> saveFiles(Long noteNo, List<MultipartFile> noteUploadFiles) {
        log.info("첨부파일 저장 시작 - noteNo: {}, 첨부파일 수: {}", noteNo, noteUploadFiles.size());

        NoteSend noteSend = noteSendRepository.findById(noteNo)
                .orElseThrow(() -> {
                    log.error("noteSend 조회 실패 - noteNo: {}", noteNo);
                    return new IllegalArgumentException("해당 문서를 찾을 수 없음");
                });

        List<NoteAttachmentDTO> resultList = new ArrayList<>();
        String folderPath = makeFolder();

        for (MultipartFile file : noteUploadFiles) {
            if (file.isEmpty())
                continue;

            String originalName = file.getOriginalFilename();
            String uuid = UUID.randomUUID().toString();
            String saveName = uuid + "_" + originalName;

            File saveFile = new File(uploadBasePath, folderPath + File.separator + saveName);
            try {
                FileCopyUtils.copy(file.getBytes(), saveFile);
            } catch (Exception e) {
                log.error("파일 저장 실패: {}", e.getMessage(), e);
                continue;
            }

            NoteAttachment noteAttachment = NoteAttachment.builder()
                    .noteSend(noteSend)
                    .noteFileName(originalName)
                    .noteFilePath(folderPath)
                    .noteFileUuid(uuid)
                    .noteFileSize(file.getSize())
                    .build();

            log.info("연결된 noteSendNo: {}", noteAttachment.getNoteSend().getNoteSendNo());

            noteAttachmentRepository.save(noteAttachment);
            noteAttachmentRepository.flush();

            resultList.add(NoteAttachmentDTO.builder()
                    .noteAttachmentNo(noteAttachment.getNoteAttachmentNo())
                    .noteFileName(originalName)
                    .noteFilePath(folderPath)
                    .noteFileUuid(uuid)
                    .build());
        }

        log.info("전체 저장 완료 - 성공 {}개 / 요청 {}개", resultList.size(), noteUploadFiles.size());
        return resultList;
    }

    @Override
    public void deleteFile(String noteFileName) {
        log.info("메일 파일 삭제 요청 : {}", noteFileName);

        try {
            // 디코딩
            String decodedName = URLDecoder.decode(noteFileName, "UTF-8");

            // 경로 파싱
            String[] parts = decodedName.split("/");

            if (parts.length < 4) {
                throw new IllegalArgumentException("잘못된 파일 경로 형식");
            }

            String noteAttachmentName = parts[parts.length - 1]; // uuid_filename
            String uuid = noteAttachmentName.substring(0, noteAttachmentName.indexOf("_"));

            // yyyy/MM/dd
            String folderPath = IntStream.range(0, parts.length - 1)
                    .mapToObj(i -> parts[i])
                    .collect(Collectors.joining("/"));

            // 실제 경로 지정
            File file = new File(uploadBasePath + File.separator + folderPath, noteAttachmentName);
            if (file.exists()) {
                file.delete();
            }

            // DB도 삭제
            String originalFileName = noteAttachmentName.substring(noteAttachmentName.indexOf("_") + 1);
            noteAttachmentRepository.deleteByNoteFileUuidAndNoteFileNameAndNoteFilePath(uuid, originalFileName,
                    folderPath);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("파일 삭제 실패: " + e.getMessage());
        }

    }

    private String makeFolder() {
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        String folderPath = dateStr.replace("/", File.separator);

        File folder = new File(uploadBasePath, folderPath);

        if (!folder.exists()) {
            folder.mkdirs();
        }
        return folderPath;
    }

    // 첨부파일 목록 조회 (noteNo 기준)
    public List<String> findFileNamesByNoteNo(Long noteNo) {
        return noteAttachmentRepository.findByNoteSend_NoteSendNo(noteNo).stream()
                .map(NoteAttachment::getNoteFileName)
                .collect(Collectors.toList());
    }

    // 첨부파일 다운로드용 리소스 반환
    public Resource loadFileAsResource(Long noteNo, String fileName) {
        try {
            // UUID는 DB에서 찾기보다는 디스크 기준으로 일치한 파일 탐색 (UUID+파일명 조합 추정)
            List<NoteAttachment> files = noteAttachmentRepository.findByNoteSend_NoteSendNo(noteNo);

            NoteAttachment target = files.stream()
                    .filter(f -> f.getNoteFileName().equals(fileName))
                    .findFirst()
                    .orElseThrow(() -> new IllegalArgumentException("파일 정보가 존재하지 않습니다."));

            String uuid = target.getNoteFileUuid();
            String folderPath = target.getNoteFilePath();
            String fullFileName = uuid + "_" + fileName;

            Path filePath = Paths.get(uploadBasePath, folderPath, fullFileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                throw new RuntimeException("파일이 존재하지 않습니다.");
            }

            return resource;
        } catch (MalformedURLException e) {
            throw new RuntimeException("파일 로드 실패", e);
        }
    }
}
