import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { AcceptJSService, CreditCard } from '@openutility/acceptjs-angular-wrapper';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
export class CCComponent implements OnInit {

  public months = Array(12).fill('').map((x, i) => i + 1); 
  public years = Array(10).fill((new Date()).getFullYear()).map((x, i) => x + i );
  public ErrorMsg: string = null;

  paymentForm = this.fb.group({
    cardNumber: ['4111111111111111'],
    cardCode: [''],
    month: [''],
    year: [''],
    zip: [''],
    amount: [((Math.random() * 100) + 1).toFixed(2)]
  });

  constructor(private fb: FormBuilder,
              private _acceptJSSrv: AcceptJSService,
              private _http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) { }

  public async onSubmit(): Promise<void> {
    this.ErrorMsg = null;
    if (!this.paymentForm.valid) {
      return;
    }
    const cc: CreditCard = this.paymentForm.value;
    try {

      // generate a nonce payment using the acceptJS service.
      const nonce = await this._acceptJSSrv.generatePaymentNonce(cc);

      // submit nonce to your server with payment amount
      const rply = await this._http.post('/paymentapi', {
        nonce,
        amount: this.paymentForm.value.amount
      }).toPromise();

      console.log('received response back', rply);

      if (rply && (rply as any).respCode === '1') {
        // NOTE: You should NEVER handle the confirmation this way, it is unsafe, but for the sake of
        // simple code we will handle it this way.
        this.router.navigate(['../success'], { relativeTo: this.route, queryParams: { conf: (rply as any).transId }});
      }

      if (rply && 'error' in rply) {
        this.ErrorMsg = (rply as any).error.reduce((p, c) => p + (`${c.errorCode}: ${c.errorText}`), '');
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  ngOnInit(): void {
  }
  public test(): void {
    this._http.post('/paymentapi', {
      test: 'temp', other: 'tmp'
    }).toPromise();
  }
}
