import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitedProductsComponent } from './limited-products.component';

describe('LimitedProductsComponent', () => {
  let component: LimitedProductsComponent;
  let fixture: ComponentFixture<LimitedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
