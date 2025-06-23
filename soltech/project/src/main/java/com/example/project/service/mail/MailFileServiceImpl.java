package com.example.project.service.mail;

import java.io.File;
import java.net.URLDecoder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.entity.mail.MailAttachment;
import com.example.project.entity.mail.MailSend;
import com.example.project.repository.mail.MailAttachmentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailFileServiceImpl implements MailFileService { // 🔧 implements 추가됨

    private final MailAttachmentRepository mailAttachmentRepository;
    private final String uploadBasePath = "C:/project/soltech/project/mailupload";

    @Override
    public MailAttachment saveFile(MultipartFile file, MailSend mailSend) {
        try {
            String folderPath = makeFolder();
            String originalName = file.getOriginalFilename();
            String uuid = UUID.randomUUID().toString();
            String saveName = uuid + "_" + originalName;

            File saveFile = new File(uploadBasePath, folderPath + File.separator + saveName);
            FileCopyUtils.copy(file.getBytes(), saveFile);

            MailAttachment attachment = MailAttachment.builder()
                    .mailNo(mailSend)
                    .mailFileName(originalName)
                    .mailFilePath(folderPath)
                    .mailFileUuid(uuid)
                    .mailFileSize((int) file.getSize())
                    .mailUploadDate(LocalDate.now())
                    .build();

            return mailAttachmentRepository.save(attachment);

        } catch (Exception e) {
            log.error("파일 저장 실패", e);
            throw new RuntimeException("파일 저장 실패: " + e.getMessage());
        }
    }

    @Override
    public void deleteFile(String encodedPath) {
        try {
            String decoded = URLDecoder.decode(encodedPath, "UTF-8");
            File file = new File(uploadBasePath, decoded);
            if (file.exists()) {
                file.delete();
            }
        } catch (Exception e) {
            log.error("파일 삭제 실패", e);
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
}
