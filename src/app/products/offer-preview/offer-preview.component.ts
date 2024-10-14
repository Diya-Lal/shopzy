import { Component, signal } from '@angular/core';
import {ProgressBar, ProgressBarModule} from "primeng/progressbar";
import { finalize, map, takeUntil, timer } from 'rxjs';
import {AsyncPipe} from "@angular/common";
const OFFER_TIME = 30;
@Component({
  selector: 'app-offer-preview',
  standalone: true,
  imports: [ProgressBarModule, AsyncPipe],
  templateUrl: './offer-preview.component.html',
  styleUrl: './offer-preview.component.scss'
})
export class OfferPreviewComponent {
  offerExpired = signal(false);
  timer = timer(0, 1000).pipe(
    map((val) => {
      if (!val) {
        return 100;
      }
      return ((OFFER_TIME - val) / OFFER_TIME) * 100;
    }),
    takeUntil(timer((OFFER_TIME + 1) * 1000)),
    finalize(() => {
      this.offerExpired.set(true);
    })
  );
  remainingTime = this.timer.pipe(
    map((val) => Math.round((val / 100) * OFFER_TIME))
  );
}
