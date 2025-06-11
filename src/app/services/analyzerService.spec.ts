import { TestBed } from '@angular/core/testing';

import { AnalyzerService } from './analyzerService';
import {RequestDTO} from '../models/requestDTO';
import {LetterGroup} from '../enums/LetterGroup';

describe('Analyzer', () => {
  let service: AnalyzerService;
  let resultMap$: Map<string,number> = new Map();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct amount of vowels for offline call', () => {
    let request: RequestDTO = {
      inputText: "The quick brown fox jumps over the lazy dog.",
      useRestApi: false,
      letterGroup: LetterGroup.Vowel
    }
    service.analyze(request).subscribe(response => {
      resultMap$ = response.resultMap;
    })
    expect(resultMap$.get("a")).toBe(1);
    // expect(resultMap$.get("e")).toBe(3);
    // expect(resultMap$.get("i")).toBe(1);
    // expect(resultMap$.get("o")).toBe(4);
    // expect(resultMap$.get("u")).toBe(2);
  });
});
