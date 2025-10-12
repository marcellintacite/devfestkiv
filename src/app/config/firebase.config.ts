import { EVENT_CONFIG } from './event.config';

export const firebaseConfig = {
  projectId: EVENT_CONFIG.firebase.projectId,
  appId: EVENT_CONFIG.firebase.appId,
  storageBucket: EVENT_CONFIG.firebase.storageBucket,
  apiKey: EVENT_CONFIG.firebase.apiKey,
  authDomain: EVENT_CONFIG.firebase.authDomain,
  messagingSenderId: EVENT_CONFIG.firebase.messagingSenderId,
  measurementId: EVENT_CONFIG.firebase.measurementId,
};