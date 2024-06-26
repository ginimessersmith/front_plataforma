import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPointComponent } from './history-point.component';

describe('HistoryPointComponent', () => {
  let component: HistoryPointComponent;
  let fixture: ComponentFixture<HistoryPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryPointComponent]
    });
    fixture = TestBed.createComponent(HistoryPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
