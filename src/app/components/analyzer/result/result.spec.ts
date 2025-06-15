import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { Result } from './result';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

describe('Result', () => {
  let component: Result;
  let fixture: ComponentFixture<Result>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Result]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Result);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display unrecognized letters when set is not empty', () => {
    component.unrecognizedLetters = new Set(['ö', 'ß', 'é']);
    component.resultMap = new Map([['a', 2], ['e', 1]]);
    fixture.detectChanges();
    const unrecognizedTextField = fixture.debugElement.query(By.css('#unrecognized-letters'));
    expect(unrecognizedTextField).toBeTruthy();
    const textContent = unrecognizedTextField.nativeElement.textContent;
    expect(textContent).toContain('Unrecognized Characters:');
    component.unrecognizedLetters.forEach(letter => expect(textContent).toContain(letter));
  });

  it('should not display unrecognized letters when set is empty', () => {
    component.unrecognizedLetters = new Set();
    component.resultMap = new Map([['a', 2], ['e', 1]]);
    fixture.detectChanges();
    const unrecognizedTextField = fixture.debugElement.query(By.css('#unrecognized-letters'));
    expect(unrecognizedTextField).toBeFalsy();
  });

  it('should show a result for each resultmap entry', () => {
    component.unrecognizedLetters = new Set();
    component.resultMap = new Map([['a', 2], ['e', 1], ['i', 1], ['o', 4], ['u', 5]]);
    fixture.detectChanges();
    const resultListItems = fixture.debugElement.queryAll(By.css('#result-list mat-list-item'));
    expect(resultListItems.length).toBe(5);
  });

  it('should show no results when resultmap is empty', () => {
    component.unrecognizedLetters = new Set(['ö', 'ß', 'é']);
    component.resultMap = new Map();
    fixture.detectChanges();
    const resultListItems = fixture.debugElement.queryAll(By.css('#result-list mat-list-item'));
    expect(resultListItems.length).toBe(0);
  });

});
