import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  get batch() {
    return this.db.firestore.batch();
  }

  getDocuments(path: string) {
    return this.db.doc(path).valueChanges({
      idField: 'id',
    });
  }

  getDocRef(collection: string) {
    return this.db.firestore.collection(collection).doc();
  }

  getDocumentsByCollection(collection: string) {
    return this.db.collection(collection).valueChanges({
      idField: 'id',
    });
  }

  addDocumentToCollection(collection: string, object: any) {
    return this.db.collection(collection).add({
      ...object,
      createdAt: new Date(),
    });
  }

  updateDocument(path: string, object: any) {
    return this.db.doc(path).update({
      ...object,
      updatedAt: new Date(),
    });
  }

  deleteDocument(path: string) {
    return this.db.doc(path).delete();
  }

  getList<T>(path: any, callbackRef?: QueryFn) {
    return this.db.collection<T>(path, callbackRef).get();
  }
}
