import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileService } from 'src/app/service/files.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  uploadProgress?: number = 0;
  isUploadFinished: boolean = false;
  isUploadedSuccess: boolean = true;

  @Output()
  uploadSuccessEvent = new EventEmitter();

  constructor(private fileService: FileService) {}

  ngOnInit(): void {}

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.isUploadFinished = false;
        this.uploadProgress = 0;
        this.fileService.uploadFile(file).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round(
                (100 * event.loaded) / event.total
              );
            } else if (event instanceof HttpResponse) {
              this.isUploadFinished = true;
              this.isUploadedSuccess = true;
              this.uploadSuccessEvent.emit(event.body);
            }
          },
          (err) => {
            this.isUploadFinished = true;
            this.isUploadedSuccess = false;
          }
        );
      }
    }
  }
}
