import { Component, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { slideInDownAnimation } from '../animations';

@Component({
  templateUrl: './compose-message.component.html',
  styles: [':host { position: relative; bottom: 10%; }'],
  animations: [slideInDownAnimation]
})
export class ComposeMessageComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  message: string;
  details: string;
  sending = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    // this.router.navigate(['.', { outlets: { popup: null } }]);
    // this.router.navigate(['.', { outlets: { popup: null } }], {
    //   relativeTo: this.route
    // });
    // this.router.navigate(['/'], {
    //   relativeTo: this.route
    // });
    // this.router.navigate(['../', { outlets: { popup: null } }], {
    //   relativeTo: this.route
    // });
    this.router.navigate(['../', { outlets: { popup: null } }], {
      relativeTo: this.route
    });
  }
}
