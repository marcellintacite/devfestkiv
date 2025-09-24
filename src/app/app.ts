import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template:`
  <app-navbar/>
  <router-outlet></router-outlet>
  <app-footer/>
  `
})
export class App {
  protected readonly title = signal('devfestkivu');
}
