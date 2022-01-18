export interface FileModel {
  id: number;
  name: string;
  date: Date;
  size: string;
  type: string;
}

export interface StoredFileData {
  data: string;
}
