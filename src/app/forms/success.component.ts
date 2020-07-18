import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  template: `
    <p>
      Payment made: Confirmation code {{confirmationCode}}
    </p>
  `,
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  public confirmationCode: string = null;

  constructor(private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      // writing from the 'url' to the page is a bad idea, please don't do this in production
      this.confirmationCode = params['conf'];
    });
}

  ngOnInit(): void {
  }

}
