import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConf } from '../app.conf';
import { FileModel, StoredFileData } from '../models/file-model';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest(
      'POST',
      `${appConf.basePath}/files/upload`,
      formData,
      { reportProgress: true, responseType: 'text' }
    );
    return this.http.request(request);
  }

  getAllFilesEndpoints(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(`${appConf.basePath}/files`);
  }

  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${appConf.basePath}/files/download`, {
      responseType: 'blob',
      params: { id },
    });
  }

  getFile(id: number): Observable<StoredFileData> {
    return this.http.get<StoredFileData>(`${appConf.basePath}/files/send`, {
      params: { id },
    });
  }

  deleteFile(id: number): Observable<any> {
    return this.http.delete<any>(`${appConf.basePath}/files/delete`, {
      params: { id },
    });
  }
}
