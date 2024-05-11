import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePageComponent } from './resource-page.component';

describe('ResourcePageComponent', () => {
  let component: ResourcePageComponent;
  let fixture: ComponentFixture<ResourcePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcePageComponent]
    });
    fixture = TestBed.createComponent(ResourcePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
