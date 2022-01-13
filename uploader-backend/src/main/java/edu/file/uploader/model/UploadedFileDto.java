package edu.file.uploader.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class UploadedFileDto {
    private Long id;
    private String name;
    private Date date;
    private String downloadUrl;
    private String sendUrl;
    private String type;
    private String size;
}
