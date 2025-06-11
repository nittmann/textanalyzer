import {Component, Input} from '@angular/core';
import {KeyValuePipe, NgForOf} from '@angular/common';
import {MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-result',
  templateUrl: './result.html',
  standalone: true,
  imports: [
    NgForOf,
    KeyValuePipe,
    MatList,
    MatListItem
  ],
  styleUrl: './result.css'
})
export class Result {
  @Input() resultMap$!: Map<string, number>;

}
