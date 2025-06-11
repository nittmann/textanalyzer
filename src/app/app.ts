import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Analyzer} from './components/analyzer/analyzer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Analyzer],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected title = 'Textanalyzer';
}
