import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template:`
<router-outlet/>
  `
})
export class App {
  protected readonly title = signal('devfestkivu');
}
