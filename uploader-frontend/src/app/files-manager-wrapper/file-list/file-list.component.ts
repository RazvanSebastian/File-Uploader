import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private fileService: FileService) {}

  ngOnInit(): void {}

  showImage(file: FileModel) {}

  downloadImage(file: FileModel) {
    this.fileService
      .downloadFile(file.downloadUrl, file.type)
      .pipe(take(1))
      .subscribe((data) => {
        saveAs(data, file.name);
      });
  }
}
