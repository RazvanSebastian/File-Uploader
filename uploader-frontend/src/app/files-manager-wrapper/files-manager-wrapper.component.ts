import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FileModel } from '../models/file-model';
import { FileService } from '../service/files.service';

@Component({
  selector: 'app-files-manager-wrapper',
  templateUrl: './files-manager-wrapper.component.html',
  styleUrls: ['./files-manager-wrapper.component.css'],
})
export class FilesManagerWrapperComponent implements OnInit {
  fileList: FileModel[] = [];

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.initializeFileList();
  }

  onUploadSuccessEvent(event: any) {
    this.initializeFileList();
  }

  initializeFileList() {
    this.fileService
      .getAllFilesEndpoints()
      .pipe(take(1))
      .subscribe((files) => (this.fileList = files));
  }
}
