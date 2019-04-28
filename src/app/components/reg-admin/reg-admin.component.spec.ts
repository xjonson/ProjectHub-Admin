import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegAdminComponent } from './reg-admin.component';

describe('RegAdminComponent', () => {
  let component: RegAdminComponent;
  let fixture: ComponentFixture<RegAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
