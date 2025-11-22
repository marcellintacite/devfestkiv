import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, FieldValue, Firestore, setDoc } from '@angular/fire/firestore';
import {FloatingReaction, Session} from '../models/session-model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private readonly fs = inject(Firestore);
  private readonly _injector: EnvironmentInjector = inject(EnvironmentInjector);
  private readonly sessionsCol = collection(this.fs, `sessions`);
  createDocId = (colName: string) => doc(collection(this.fs, colName)).id;

  private readonly emojisCol = collection(this.fs, `emojis`);

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

  setEmojis(emojis: FloatingReaction) {
    return runInInjectionContext(this._injector, () => {
      const docRef = doc(this.fs, `emojis/${emojis.id}`);
      return setDoc(docRef, emojis, { merge: true });
    });
  }
  getEmojis() {
    return runInInjectionContext(this._injector, () => {
      return collectionData(this.emojisCol) as any;
    });
  }
  deleteSession(sessionId: string) {
    return runInInjectionContext(this._injector, () => {
      const drinkRef = doc(this.fs, `sessions/${sessionId}`);
      return deleteDoc(drinkRef);
    });
  }
}
