import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './files-manager-wrapper/file-upload/file-upload.component';
import { FileListComponent } from './files-manager-wrapper/file-list/file-list.component';
import { FilesManagerWrapperComponent } from './files-manager-wrapper/files-manager-wrapper.component';
import { ImageFileDisplayComponent } from './files-manager-wrapper/image-file-display/image-file-display.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    FileListComponent,
    FilesManagerWrapperComponent,
    ImageFileDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
