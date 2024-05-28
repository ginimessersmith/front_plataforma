import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyResourcesComponent } from './my-resources.component';

describe('MyResourcesComponent', () => {
  let component: MyResourcesComponent;
  let fixture: ComponentFixture<MyResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyResourcesComponent]
    });
    fixture = TestBed.createComponent(MyResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
