import {Component, Input} from '@angular/core';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-result',
  templateUrl: './result.html',
  standalone: true,
  imports: [
    KeyValuePipe,
    MatList,
    MatListItem,
    MatDivider
  ],
  styleUrl: './result.css'
})
export class Result {
  @Input() resultMap: Map<string, number> = new Map();
  @Input() unrecognizedLetters: Set<string> = new Set();
}
