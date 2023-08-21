import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { COLLECTIONS } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  constructor(private db: AngularFirestore) {}

  getWeights(limit = 10) {
    return this.db
      .collection(COLLECTIONS.WEIGHTS, (ref) =>
        ref.limit(limit).orderBy('createdAt', 'desc')
      )
      .get();
  }

  getNextWeights(limit = 1, lastInResponse: any) {
    return this.db
      .collection(COLLECTIONS.WEIGHTS, (ref) =>
        ref.orderBy('createdAt', 'desc').startAfter(lastInResponse).limit(limit)
      )
      .get();
  }
}
