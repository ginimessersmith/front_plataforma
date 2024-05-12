import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneQuestionPageComponent } from './one-question-page.component';

describe('OneQuestionPageComponent', () => {
  let component: OneQuestionPageComponent;
  let fixture: ComponentFixture<OneQuestionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneQuestionPageComponent]
    });
    fixture = TestBed.createComponent(OneQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
