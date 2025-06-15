import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Analyzer } from './analyzer';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {AnalyzerService} from '../../services/analyzerService';
import {ResponseDTO} from '../../models/responseDTO';
import {of} from 'rxjs';

const EMPTY_RESULT_DTO: ResponseDTO = {
  resultMap: new Map(),
  unrecognizedLetters: new Set()
};

describe('Analyzer', () => {
  let component: Analyzer;
  let fixture: ComponentFixture<Analyzer>;
  let analyzerServiceMock: jasmine.SpyObj<AnalyzerService>;

  beforeEach(async () => {
    analyzerServiceMock = jasmine.createSpyObj<AnalyzerService>('AnalyzerService', ['analyze']);
    await TestBed.configureTestingModule({
      imports: [Analyzer],
      providers: [provideHttpClient(), provideHttpClientTesting(),{ provide: AnalyzerService, useValue: analyzerServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Analyzer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize form', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
    expect(component.form.get('useRestApi')?.value).toBeTrue();
    expect(component.form.get('letterType')?.value).toBe(1);
    expect(component.form.get('inputText')?.value).toBe('');
  });

  it('should call service with form parameters', () => {
    analyzerServiceMock.analyze.and.returnValue(of(EMPTY_RESULT_DTO));
    component.form.setValue({
      useRestApi: true,
      letterType: 1,
      inputText: 'Valid Input Text'
    });
    component.analyze();
    expect(analyzerServiceMock.analyze).toHaveBeenCalledWith(
      { inputText: 'Valid Input Text', letterType: 1 },
      true
    );
  });
});
