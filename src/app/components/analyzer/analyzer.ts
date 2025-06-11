import {Component} from '@angular/core';
import {AnalyzerService} from '../../services/analyzerService';
import {Result} from './result/result';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {RequestDTO} from '../../models/requestDTO';

@Component({
  selector: 'app-analyzer',
  imports: [CommonModule, Result, ReactiveFormsModule, MatSlideToggleModule, MatInputModule, MatFormFieldModule, MatButtonToggleModule, MatButtonModule],
  templateUrl: './analyzer.html',
  standalone: true,
  styleUrl: './analyzer.css'
})
export class Analyzer {

  constructor(private analyzerService: AnalyzerService) {}

  public form = new FormGroup({
    useRestApi: new FormControl<boolean>(true),
    letterGroup: new FormControl<number>(1),
    inputText: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(1)]})
  });

  resultMap$: Map<string,number> = new Map();

  analyze() {
    let request: RequestDTO = {
      inputText: this.form.get('inputText')?.value!,
      useRestApi: this.form.get('useRestApi')?.value!,
      letterGroup: this.form.get('letterGroup')?.value!
    }

    this.analyzerService.analyze(request)
      .subscribe(response => {
        this.resultMap$ = response.resultMap;
      });
  }
}
