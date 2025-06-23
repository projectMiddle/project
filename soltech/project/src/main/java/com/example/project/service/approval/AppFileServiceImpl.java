package com.example.project.service.approval;

import java.io.File;
import java.net.URLDecoder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.approval.AppFileDTO;
import com.example.project.entity.approval.AppFile;
import com.example.project.entity.approval.ApprovalDocument;
import com.example.project.repository.approval.AppFileRepository;
import com.example.project.repository.approval.ApprovalDocumentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class AppFileServiceImpl implements AppFileService {

    private final AppFileRepository appFileRepository;
    private final ApprovalDocumentRepository approvalDocumentRepository;

    private final String uploadBasePath = "C:/project/soltech/project/upload"; // 실제 저장 경로 (리눅스면 /home/ubuntu/upload 등으로 변경)

    @Override
    public List<AppFileDTO> saveFiles(Long appDocNo, MultipartFile[] uploadFiles) {

        // 1. 문서 찾기
        ApprovalDocument doc = approvalDocumentRepository.findById(appDocNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 문서를 찾을 수 없음"));

        List<AppFileDTO> resultList = new ArrayList<>();

        // 2. 날짜 경로 생성 (yyyy/MM/dd)
        String folderPath = makeFolder();

        for (MultipartFile file : uploadFiles) {
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
            AppFile appFile = AppFile.builder()
                    .appDocNo(doc)
                    .build();
            appFile.updateFileInfo(originalName, folderPath, uuid);
            appFileRepository.save(appFile);

            // 5. DTO로 응답 준비 (EntityToDto)
            AppFileDTO dto = AppFileDTO.builder()
                    .appFileNo(appFile.getAppFileNo())
                    .appFileName(originalName)
                    .appFileUuid(uuid)
                    .appFilePath(folderPath)
                    .build();
            resultList.add(dto);
        }

        return resultList;

    }

    @Override
    public void deleteFile(String fileName) {
        log.info("파일 삭제 요청: {}", fileName);

        try {
            // 디코딩
            String decodedName = URLDecoder.decode(fileName, "UTF-8");

            // 경로 파싱
            String[] parts = decodedName.split("/");

            if (parts.length < 4) {
                throw new IllegalArgumentException("잘못된 파일 경로 형식");
            }

            String appFileName = parts[parts.length - 1]; // uuid_filename
            String uuid = appFileName.substring(0, appFileName.indexOf("_"));

            // yyyy/MM/dd
            String folderPath = IntStream.range(0, parts.length - 1)
                    .mapToObj(i -> parts[i])
                    .collect(Collectors.joining("/"));

            // 실제 경로 지정
            File file = new File(uploadBasePath + File.separator + folderPath, appFileName);
            if (file.exists()) {
                file.delete();
            }

            // DB도 삭제
            appFileRepository.deleteByAppFileUuidAndAppFileNameAndAppFilePath(uuid, appFileName, folderPath);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("파일 삭제 실패: " + e.getMessage());
        }

    }

    // yyyy/MM/dd 형식 폴더 생성
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
