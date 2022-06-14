import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavArrowComponent } from './nav-arrow.component';

describe('NavArrowComponent', () => {
  let component: NavArrowComponent;
  let fixture: ComponentFixture<NavArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavArrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
