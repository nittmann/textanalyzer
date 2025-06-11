import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ResultDTO} from '../models/resultDTO';
import {RequestDTO} from '../models/requestDTO';
import {LetterGroup, LetterGroupRegex} from '../enums/LetterGroup';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {

  constructor(private http: HttpClient) {}

  private resultMap!: Map<string, number>;

  analyze(request: RequestDTO): Observable<ResultDTO> {
    if (request.useRestApi) {
      return this.http.post<ResultDTO>(environment.apiUrl + '/analyze', request)
    }
    else {
      console.log("using offline analyzer.")
      return this.analyzeOffline(request);
    }
  }

  private analyzeOffline(request: RequestDTO): Observable<ResultDTO> {
    const regex: RegExp = LetterGroupRegex[request.letterGroup as LetterGroup];
    this.resultMap = new Map();
    this.convertTextToLetterArray(request.inputText)
      .filter(char => regex.test(char))
      .forEach(char => {
        let counter = this.resultMap.has(char) ? this.resultMap.get(char)! : 0;
        this.resultMap.set(char, counter + 1);
      }
    );

    let result: ResultDTO = {
      resultMap: this.resultMap
    }
    return of(result);
  };

  private convertTextToLetterArray(inputText: string): string[] {
    return inputText.toLowerCase().split('');
  }
}
