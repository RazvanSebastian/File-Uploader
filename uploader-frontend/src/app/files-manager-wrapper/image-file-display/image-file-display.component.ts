import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FileModel, StoredFileData } from 'src/app/models/file-model';
import { FileService } from 'src/app/service/files.service';

@Component({
  selector: 'app-image-file-display',
  templateUrl: './image-file-display.component.html',
  styleUrls: ['./image-file-display.component.css'],
})
export class ImageFileDisplayComponent implements OnInit {
  imageData: any;

  @Input('file')
  set file(file: FileModel | null) {
    if (file?.type.startsWith('image/')) {
      this.fileService
        .getFile(file.id)
        .pipe(take(1))
        .subscribe((response: StoredFileData) => {
          this.imageData = `data:${file.type};base64,${response.data}`;
          const imgElement = document.querySelector('#selectedImage');
          imgElement?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          });
        });
    }
  }

  constructor(private fileService: FileService) {}

  ngOnInit(): void {}
}
