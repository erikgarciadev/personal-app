import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  async uploadFile(fileName: string, file: Blob) {
    const storageRef = this.storage.ref(fileName);

    await lastValueFrom(this.storage.upload(fileName, file).snapshotChanges());

    const downloadURL = await lastValueFrom(storageRef.getDownloadURL());

    return downloadURL;
  }
}
