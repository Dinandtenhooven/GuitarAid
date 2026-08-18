import { Component, signal, Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './base/top-bar/top-bar.component';
import { CompoundViewComponent } from "./components/Views/CompoundViewComponent/compound-view.component";
import { View } from './models/view';

@Component({
  selector: 'app-root',
  imports: [
    TopBarComponent,
    CompoundViewComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GuitarAid');

  views: View[] = [];

}
