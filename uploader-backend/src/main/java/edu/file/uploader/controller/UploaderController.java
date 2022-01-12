package edu.file.uploader.controller;

import edu.file.uploader.model.UploadedFile;
import edu.file.uploader.model.UploadedFileDto;
import edu.file.uploader.service.FileUploaderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@RestController
@RequestMapping("/files")
public class UploaderController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UploaderController.class);

    @Autowired
    private FileUploaderService fileUploaderService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            final UploadedFile uploadedFile = fileUploaderService.save(file);
            return ResponseEntity.ok(String.format("http://localhost:8080/file/download?id=%d", uploadedFile.getId()));
        } catch (IOException e) {
            LOGGER.error(String.format("Could not save the file %s ", file.getName()));
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body("The file could not be stored!");
        }
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadFile(@RequestParam("id") Long id) {
        final UploadedFile file = fileUploaderService.getUploadedFile(id);
        if (!ObjectUtils.isEmpty(file)) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename=\"%s\"", file.getName()))
                    .body(file.getData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/send")
    public ResponseEntity<UploadedFile> sendFile(@RequestParam("id") Long id) {
        final UploadedFile file = fileUploaderService.getUploadedFile(id);
        if (!ObjectUtils.isEmpty(file)) {
            return ResponseEntity.ok(file);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<UploadedFileDto> getAllFilesEndpoints() {
        return fileUploaderService.getAllFilesEndpoints();
    }

}
