import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FxCurrencyWidget } from './fx-currency-widget';

describe('ForexCalculatorComponent', () => {
  let component: FxCurrencyWidget;
  let fixture: ComponentFixture<FxCurrencyWidget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FxCurrencyWidget]
    });
    fixture = TestBed.createComponent(FxCurrencyWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
