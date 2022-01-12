package edu.file.uploader.repository;

import edu.file.uploader.model.UploadedFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileUploaderRepository extends JpaRepository<UploadedFile, Long> {
}
