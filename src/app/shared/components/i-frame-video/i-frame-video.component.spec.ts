import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IFrameVideoComponent } from './i-frame-video.component';

describe('IFrameVideoComponent', () => {
  let component: IFrameVideoComponent;
  let fixture: ComponentFixture<IFrameVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IFrameVideoComponent]
    });
    fixture = TestBed.createComponent(IFrameVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
