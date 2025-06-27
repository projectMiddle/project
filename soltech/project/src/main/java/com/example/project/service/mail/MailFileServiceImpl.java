package com.example.project.service.mail;

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
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.mail.MailAttachmentDTO;
import com.example.project.entity.mail.MailAttachment;
import com.example.project.entity.mail.MailSend;
import com.example.project.repository.mail.MailAttachmentRepository;
import com.example.project.repository.mail.MailSendRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class MailFileServiceImpl implements MailFileService {

    private final MailAttachmentRepository mailAttachmentRepository;
    private final MailSendRepository mailSendRepository;

    private final String uploadBasePath = "C:/project/soltech/project/mail";

    @Override
    public List<MailAttachmentDTO> saveFiles(Long mailNo, MultipartFile[] mailUploadFiles) {

        // 1. 문서찾기
        MailSend atc = mailSendRepository.findById(mailNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 문서를 찾을 수 없음"));

        List<MailAttachmentDTO> resultList = new ArrayList<>();

        // 2. 날짜 경로 생성 (yyyy/MM/dd)
        String folderPath = makeFolder();

        for (MultipartFile file : mailUploadFiles) {
            if (file.isEmpty())
                continue;

            String originalName = file.getOriginalFilename();
            String uuid = UUID.randomUUID().toString();

            // 저장 파일명: UUID_원본명
            String saveName = uuid + "_" + originalName;
            File saveFile = new File(uploadBasePath, folderPath + File.separator + saveName);

            try {
                // 3. 실제 파일 복사
                FileCopyUtils.copy(file.getBytes(), saveFile);
            } catch (Exception e) {
                e.printStackTrace();
                continue;
            }

            // 4. DB 저장 (dtoToEntity)
            MailAttachment mailAttachment = MailAttachment.builder()
                    .mailNo(atc)
                    .build();
            mailAttachment.updateFileInfo(originalName, folderPath, uuid);
            mailAttachmentRepository.save(mailAttachment);

            // 5. DTO로 응답 준비 (EntityToDto)
            MailAttachmentDTO dto = MailAttachmentDTO.builder()
                    .mailNo(mailAttachment.getMailAttachmentNo())
                    .mailFileName(originalName)
                    .mailFileUuid(uuid)
                    .mailFilePath(folderPath)
                    .build();
            resultList.add(dto);
        }

        return resultList;

    }

    @Override
    public void deleteFile(String mailFileName) {
        log.info("메일 파일 삭제 요청 : {}", mailFileName);

        try {
            // 디코딩
            String decodedName = URLDecoder.decode(mailFileName, "UTF-8");

            // 경로 파싱
            String[] parts = decodedName.split("/");

            if (parts.length < 4) {
                throw new IllegalArgumentException("잘못된 파일 경로 형식");
            }

            String mailAttachmentName = parts[parts.length - 1]; // uuid_filename
            String uuid = mailAttachmentName.substring(0, mailAttachmentName.indexOf("_"));

            // yyyy/MM/dd
            String folderPath = IntStream.range(0, parts.length - 1)
                    .mapToObj(i -> parts[i])
                    .collect(Collectors.joining("/"));

            // 실제 경로 지정
            File file = new File(uploadBasePath + File.separator + folderPath, mailAttachmentName);
            if (file.exists()) {
                file.delete();
            }

            // DB도 삭제
            mailAttachmentRepository.deleteByMailFileUuidAndMailFileNameAndMailFilePath(uuid, mailAttachmentName,
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

    // 첨부파일 목록 조회 (mailNo 기준)
    public List<String> findFileNamesByMailNo(Long mailNo) {
        return mailAttachmentRepository.findByMailNo_MailNo(mailNo).stream()
                .map(MailAttachment::getMailFileName)
                .collect(Collectors.toList());
    }

    // 첨부파일 다운로드용 리소스 반환
    public Resource loadFileAsResource(Long mailNo, String fileName) {
        try {
            // UUID는 DB에서 찾기보다는 디스크 기준으로 일치한 파일 탐색 (UUID+파일명 조합 추정)
            List<MailAttachment> files = mailAttachmentRepository.findByMailNo_MailNo(mailNo);

            MailAttachment target = files.stream()
                    .filter(f -> f.getMailFileName().equals(fileName))
                    .findFirst()
                    .orElseThrow(() -> new IllegalArgumentException("파일 정보가 존재하지 않습니다."));

            String uuid = target.getMailFileUuid();
            String folderPath = target.getMailFilePath();
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