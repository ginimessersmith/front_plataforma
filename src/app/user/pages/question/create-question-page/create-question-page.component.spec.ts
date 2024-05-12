import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionPageComponent } from './create-question-page.component';

describe('CreateQuestionPageComponent', () => {
  let component: CreateQuestionPageComponent;
  let fixture: ComponentFixture<CreateQuestionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateQuestionPageComponent]
    });
    fixture = TestBed.createComponent(CreateQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
