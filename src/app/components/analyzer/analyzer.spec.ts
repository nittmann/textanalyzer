import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Analyzer } from './analyzer';
import {provideHttpClient} from '@angular/common/http';

describe('Analyzer', () => {
  let component: Analyzer;
  let fixture: ComponentFixture<Analyzer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Analyzer],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Analyzer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
