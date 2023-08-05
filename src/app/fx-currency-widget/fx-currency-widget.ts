import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fx-currency-widget',
  templateUrl: './fx-currency-widget.html',
  styleUrls: ['./fx-currency-widget.css'],
})
export class FxCurrencyWidget implements OnInit {
  forexForm: FormGroup;
  currencies: string[] = [];
  exchangeRate: number | null = null;
  convertedAmount: number | null = null;
  amount: number | null = null;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient

  ) {
    this.forexForm = this.formBuilder.group({
      amount: [1],
      convertedAmount: [1],
      fromCurrency: ['USD'],
      toCurrency: ['EUR'],
    });
  }

  private API_KEY = '33d430beabb8572960ffcb8a15abdd8b'; //Change to registered API key
  private currencyUrl = `http://api.exchangeratesapi.io/v1/latest?access_key=${this.API_KEY}`;

   ngOnInit(): void {
    this.fetchCurrencies();
    console.log(this.currencies);
    this.subscribeToFormChanges();
  }

  private fetchCurrencies(): void {
    this.http.get<any>(this.currencyUrl).subscribe({
      next: (data) => {
        this.data = data;
        const rates = data?.rates;
        if (rates) {
          // Create an array of Currency objects from the response
          this.currencies = Object.keys(rates);
          // Update the result based on the new default currencies
          this.convertCurrency('');
        }
      },
      error: (error) => {

        console.error('Error fetching currencies:', error);
        alert('Error fetching currencies');
      },
    });
  }

  subscribeToFormChanges(): void {
    let changeControl: string = '';
    this.forexForm.valueChanges.subscribe((formValue) => {
      for (const controlName in formValue) {
        if (
          formValue.hasOwnProperty(controlName) &&
          this.forexForm.controls[controlName].dirty
        ) {
          console.log('Changed control:', controlName);
          changeControl = controlName;
          this.forexForm.controls[controlName].markAsPristine();
        }
      }
      this.convertCurrency(changeControl);
    });
  }

  convertCurrency(controlName: string): void {
    const amount = this.forexForm.get('amount')?.value;
    const convertedAmount = this.forexForm.get('convertedAmount')?.value;
    const fromCurrency = this.forexForm.get('fromCurrency')?.value;
    const toCurrency = this.forexForm.get('toCurrency')?.value;

    if (fromCurrency === 'EUR') {
      this.exchangeRate = this.data?.rates[toCurrency];
    } else {
      this.exchangeRate =
        (1 / this.data?.rates[fromCurrency]) * this.data?.rates[toCurrency];
    }
    console.log(this.exchangeRate);
    if (controlName === 'convertedAmount') {
      console.log(convertedAmount);
      this.amount = (convertedAmount || 0) / (this.exchangeRate || 0);
    } else {
      this.convertedAmount = amount * (this.exchangeRate || 0);
    }
  }
}
