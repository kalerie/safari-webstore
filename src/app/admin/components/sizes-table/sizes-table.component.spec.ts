import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizesTableComponent } from './sizes-table.component';

describe('SizesTableComponent', () => {
  let component: SizesTableComponent;
  let fixture: ComponentFixture<SizesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
