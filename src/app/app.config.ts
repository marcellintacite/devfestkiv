import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(
      {
        projectId: "devfestkivu2025",
        appId: "1:142493229043:web:2e7e063847140023c83c86",
        storageBucket: "devfestkivu2025.firebasestorage.app",
        apiKey: "AIzaSyDs1NHP5Fcwqb4G9_07eaQmNe8zrrbmqXY",
        authDomain: "devfestkivu2025.firebaseapp.com",
        messagingSenderId: "142493229043",
        measurementId: "G-JGFQPBQ6WY"
      })),
    provideFirestore(() => getFirestore())
  ]
};
