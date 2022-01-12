package edu.file.uploader.service;

import edu.file.uploader.model.UploadedFile;
import edu.file.uploader.model.UploadedFileDto;
import edu.file.uploader.repository.FileUploaderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileUploaderService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FileUploaderService.class);

    @Autowired
    private FileUploaderRepository fileUploaderRepository;

    public UploadedFile save(final MultipartFile file) throws IOException {
        LOGGER.info(String.format("Save file with name %s", file.getName()));

        final UploadedFile uploadedFile = new UploadedFile();
        final String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        uploadedFile.setDate(new Date());
        uploadedFile.setName(fileName);
        uploadedFile.setType(file.getContentType());
        uploadedFile.setSize(file.getSize());
        uploadedFile.setData(file.getBytes());

        return fileUploaderRepository.save(uploadedFile);
    }


    public UploadedFile getUploadedFile(final Long id) {
        LOGGER.info(String.format("Find file with id %d", id));
        return fileUploaderRepository.getById(id);
    }

    public List<UploadedFileDto> getAllFilesEndpoints() {
        LOGGER.info("Generate all endpoints for retrieving files");
        final List<UploadedFile> files = fileUploaderRepository.findAll();
        return files.stream()
                .map(file -> buildUploadedFileDto(file))
                .collect(Collectors.toList());
    }

    private UploadedFileDto buildUploadedFileDto(final UploadedFile file) {
        return UploadedFileDto.builder()
                .name(file.getName())
                .type(file.getType())
                .size(String.format("%d KB", (file.getSize() == 0 ? 0 : file.getSize()/1024)))
                .date(file.getDate())
                .url(String.format("http://localhost:8080/files/download?id=%d", file.getId()))
                .build();
    }

}
