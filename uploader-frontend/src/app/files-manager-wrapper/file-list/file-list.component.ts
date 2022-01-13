import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { saveAs } from 'file-saver';
import { take } from 'rxjs/operators';
import { FileModel } from 'src/app/models/file-model';
import { FileService } from 'src/app/service/files.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
})
export class FileListComponent implements OnInit {
  @Input()
  fileList: FileModel[] = [];

  @Output()
  showImageEvent = new EventEmitter<FileModel>();

  constructor(private fileService: FileService) {}

  ngOnInit(): void {}

  showImage(file: FileModel) {
    if (file.type.startsWith('image/')) {
      this.showImageEvent.emit(file);
    }
  }

  downloadFile(file: FileModel) {
    this.fileService
      .downloadFile(file.downloadUrl)
      .pipe(take(1))
      .subscribe((data) => {
        saveAs(data, file.name);
      });
  }

  deleteFile(file: FileModel, index: number) {
    this.fileService.deleteFile(file.id).subscribe(() => {
      this.fileList = [
        ...this.fileList.slice(0, index),
        ...this.fileList.slice(index + 1),
      ];
    });
  }
}
