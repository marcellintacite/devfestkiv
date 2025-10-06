import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, FieldValue, Firestore, setDoc } from '@angular/fire/firestore';
import {Session} from '../models/session-model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private readonly fs = inject(Firestore);
  private readonly _injector: EnvironmentInjector = inject(EnvironmentInjector);
  private readonly sessionsCol = collection(this.fs, `sessions`);
  createDocId = (colName: string) => doc(collection(this.fs, colName)).id;

  getSessions() {
    return runInInjectionContext(this._injector, () => {
      return collectionData(this.sessionsCol) as any;
    });
  }
  setSession(session: Session<FieldValue>) {
    return runInInjectionContext(this._injector, () => {
      const docRef = doc(this.fs, `sessions/${session.id}`);
      return setDoc(docRef, session, { merge: true });
    });
  }

  deleteSession(sessionId: string) {
    return runInInjectionContext(this._injector, () => {
      const drinkRef = doc(this.fs, `sessions/${sessionId}`);
      return deleteDoc(drinkRef);
    });
  }
}
