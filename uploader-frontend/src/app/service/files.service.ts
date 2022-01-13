import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel, StoredFileData } from '../models/file-model';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest(
      'POST',
      'http://localhost:8080/files/upload',
      formData,
      { reportProgress: true, responseType: 'text' }
    );
    return this.http.request(request);
  }

  getAllFilesEndpoints(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>('http://localhost:8080/files');
  }

  downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  getFile(url: string): Observable<StoredFileData> {
    return this.http.get<StoredFileData>(url);
  }

  deleteFile(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/files/delete`, {
      params: { id },
    });
  }
}
