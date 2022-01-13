export interface FileModel {
  id: number;
  name: string;
  date: Date;
  size: string;
  type: string;
  downloadUrl: string;
  sendUrl: string;
}

export interface StoredFileData {
  data: any;
}
