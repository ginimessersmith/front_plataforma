import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRespondComponent } from './my-respond.component';

describe('MyRespondComponent', () => {
  let component: MyRespondComponent;
  let fixture: ComponentFixture<MyRespondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRespondComponent]
    });
    fixture = TestBed.createComponent(MyRespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
