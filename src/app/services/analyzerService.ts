import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ResponseDTO} from '../models/responseDTO';
import {RequestDTO} from '../models/requestDTO';
import {LetterType, LetterTypeUtils} from '../enums/LetterType';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {

  constructor(private http: HttpClient) {}

  private resultMap!: Map<string, number>;
  private unrecognizedLetters!: Set<string>;

  analyze(request: RequestDTO, useRestApi: Boolean): Observable<ResponseDTO> {
    if (useRestApi) {
      return this.http.post<ResponseDTO>(environment.apiUrl + '/analyze', request)
    }
    else {
      console.log("using offline analyzer.")
      return this.analyzeOffline(request);
    }
  }

  private analyzeOffline(request: RequestDTO): Observable<ResponseDTO> {
    this.resultMap = new Map();
    this.unrecognizedLetters = new Set();
    this.normalizeText(request.inputText)
      .forEach(c => {
        if (!this.characterCanBeAnalyzed(c)) {
          this.unrecognizedLetters.add(c);
        }
        else if (this.characterIsOfLetterType(c, request.letterType)){
          let counter = this.resultMap.has(c) ? this.resultMap.get(c)! : 0;
          this.resultMap.set(c, counter + 1);
        }
      }
    );

    let result: ResponseDTO = {
      resultMap: this.resultMap,
      unrecognizedLetters: this.unrecognizedLetters
    }
    return of(result);
  };

  private normalizeText(inputText: string): string[] {
    return inputText.toLowerCase().replace(/\s+/g, '').split('');
  }

  private characterCanBeAnalyzed(character: string): boolean {
    return this.characterIsOfLetterType(character, LetterType.Letter);
  }

  private characterIsOfLetterType(character: string, letterType: LetterType): boolean {
    let regex: RegExp = LetterTypeUtils.getRegExByLetterType(letterType);
        return regex.test(character);
  }

}
