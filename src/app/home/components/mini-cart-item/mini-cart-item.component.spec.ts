import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCartItemComponent } from './mini-cart-item.component';

describe('MiniCartItemComponent', () => {
  let component: MiniCartItemComponent;
  let fixture: ComponentFixture<MiniCartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniCartItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
