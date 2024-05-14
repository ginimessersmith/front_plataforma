import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTagComponent } from './one-tag.component';

describe('OneTagComponent', () => {
  let component: OneTagComponent;
  let fixture: ComponentFixture<OneTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneTagComponent]
    });
    fixture = TestBed.createComponent(OneTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
