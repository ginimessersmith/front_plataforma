import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPerfilComponent } from './my-perfil.component';

describe('MyPerfilComponent', () => {
  let component: MyPerfilComponent;
  let fixture: ComponentFixture<MyPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPerfilComponent]
    });
    fixture = TestBed.createComponent(MyPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
