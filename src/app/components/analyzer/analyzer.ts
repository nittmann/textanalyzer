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
import {HttpErrorResponse} from '@angular/common/http'
import {DEFAULT_ERRORS} from '../../errors/defaultErrors';
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
    letterType: new FormControl<number>(1),
    inputText: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(1)]})
  });

  resultMap$: Map<string,number> = new Map();
  unrecognizedLetters$: Set<string> = new Set();
  errors: ValidationError[] = [];

  analyze() {
    let request: RequestDTO = {
      inputText: this.form.get('inputText')?.value!,
      letterType: this.form.get('letterType')?.value!
    }
    let useRestApi = this.form.get('useRestApi')?.value!;

    this.analyzerService.analyze(request, useRestApi)
      .subscribe({
        next: response => {
          this.resultMap$ = response.resultMap;
          this.unrecognizedLetters$ = new Set(response.unrecognizedLetters);
          this.errors = [];
        },
        error: (error: HttpErrorResponse) => {
          this.processApiError(error);
        }
      });
  }

  private processApiError(error: HttpErrorResponse) {
    this.resultMap$ = new Map();
    this.unrecognizedLetters$ = new Set();
    switch (error.status) {
      case 0:
        this.errors = [DEFAULT_ERRORS.noConnection];
        break;
      case 400:
        try {
          this.errors = (error.error as ValidationError[]).map(err => ({
            code: err.code,
            message: err.message
          }));
        }
        catch (e) {
          this.errors = [DEFAULT_ERRORS.unknownError]
        }
        break;
      default:
        this.errors = [DEFAULT_ERRORS.unknownError];
    }
  }
}
