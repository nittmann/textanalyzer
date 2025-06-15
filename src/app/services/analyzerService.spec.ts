import { TestBed } from '@angular/core/testing';

import { AnalyzerService } from './analyzerService';
import {RequestDTO} from '../models/requestDTO';
import {LetterType} from '../enums/LetterType';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

describe('AnalyzerService', () => {
  let service: AnalyzerService;
  let resultMap$: Map<string,number> = new Map();
  let unrecognizedLetters$: Set<string> = new Set();
  const expectedFoxVowels = new Map<string, number>([['a', 1], ['e', 3], ['i', 1], ['o', 4], ['u', 2]]);
  const expectedFoxConsonants = new Map<string, number>([
    ['b', 1], ['c', 1], ['d', 1], ['f', 1], ['g', 1], ['h', 2], ['j', 1], ['k', 1], ['l', 1], ['m', 1], ['n', 1],
    ['p', 1], ['q', 1], ['r', 2], ['s', 1], ['t', 2], ['v', 1], ['w', 1], ['x', 1], ['y', 1], ['z', 1]]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyzerService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct amount of vowels in offline mode', () => {
    let request: RequestDTO = {
      inputText: "The quick brown fox jumps over the lazy dog.",
      letterType: LetterType.Vowel
    }
    service.analyze(request, false).subscribe(response => {
      resultMap$ = response.resultMap;
      unrecognizedLetters$ = response.unrecognizedLetters;
    })
    expect(resultMap$.size).toBe(expectedFoxVowels.size);
    resultMap$.forEach((value, key) => {
      expect(expectedFoxVowels.has(key)).toBeTrue();
      expect(expectedFoxVowels.get(key)).toBe(value);
    })
  });

  it('should return correct amount of consonants in offline mode', () => {
    let request: RequestDTO = {
      inputText: "The quick brown fox jumps over the lazy dog.",
      letterType: LetterType.Consonant
    }
    service.analyze(request, false).subscribe(response => {
      resultMap$ = response.resultMap;
      unrecognizedLetters$ = response.unrecognizedLetters;
    })
    expect(resultMap$.size).toBe(expectedFoxConsonants.size);
    resultMap$.forEach((value, key) => {
      expect(expectedFoxConsonants.has(key)).toBeTrue();
      expect(expectedFoxConsonants.get(key)).toBe(value);
    })
  });

  it('should return unrecognized letters in offline mode', () => {
    let request: RequestDTO = {
      inputText: "Valid Input Text, but with unrecognized Letters: äöüéñçß",
      letterType: LetterType.Vowel
    }
    service.analyze(request, false).subscribe(response => {
      resultMap$ = response.resultMap;
      unrecognizedLetters$ = response.unrecognizedLetters;
    })
    let expectedSet = new Set(['ä', 'ö', 'ü', 'é', 'ñ', 'ç', 'ß']);
    expectedSet.forEach(letter => {
      expect(unrecognizedLetters$.has(letter)).toBeTrue();
    })
  });

  it('should count upper- and lowercase vowels in offline mode', () => {
    let request: RequestDTO = {
      inputText: "aAeEiIoOuU",
      letterType: LetterType.Vowel
    }
    service.analyze(request, false).subscribe(response => {
      resultMap$ = response.resultMap;
      unrecognizedLetters$ = response.unrecognizedLetters;
    })
    expect(resultMap$.get("a")).toBe(2);
    expect(resultMap$.get("e")).toBe(2);
    expect(resultMap$.get("i")).toBe(2);
    expect(resultMap$.get("o")).toBe(2);
    expect(resultMap$.get("u")).toBe(2);
  });

  it('should count upper- and lowercase consonants in offline mode', () => {
    let request: RequestDTO = {
      inputText: "bBgGkKnNxX",
      letterType: LetterType.Consonant
    }
    service.analyze(request, false).subscribe(response => {
      resultMap$ = response.resultMap;
      unrecognizedLetters$ = response.unrecognizedLetters;
    })
    expect(resultMap$.get("b")).toBe(2);
    expect(resultMap$.get("g")).toBe(2);
    expect(resultMap$.get("k")).toBe(2);
    expect(resultMap$.get("n")).toBe(2);
    expect(resultMap$.get("x")).toBe(2);
  });

  it('should ignore whitespace letters in offline mode', () => {
    let request: RequestDTO = {
      inputText: "Valid Input\tText\rwith\nwhitespace\fletters",
      letterType: LetterType.Vowel
    }
    service.analyze(request, false).subscribe(response => {
      resultMap$ = response.resultMap;
      unrecognizedLetters$ = response.unrecognizedLetters;
    })
    expect(unrecognizedLetters$.size).toBe(0);
  });
});
