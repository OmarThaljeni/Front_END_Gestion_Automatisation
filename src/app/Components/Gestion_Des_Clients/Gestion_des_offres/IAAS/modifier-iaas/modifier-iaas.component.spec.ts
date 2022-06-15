import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierIaasComponent } from './modifier-iaas.component';

describe('ModifierIaasComponent', () => {
  let component: ModifierIaasComponent;
  let fixture: ComponentFixture<ModifierIaasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierIaasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierIaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
