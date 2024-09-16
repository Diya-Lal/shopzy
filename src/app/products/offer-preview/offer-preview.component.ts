import { Component } from '@angular/core';
import {ProgressBar, ProgressBarModule} from "primeng/progressbar";

@Component({
  selector: 'app-offer-preview',
  standalone: true,
  imports: [ProgressBarModule],
  templateUrl: './offer-preview.component.html',
  styleUrl: './offer-preview.component.scss'
})
export class OfferPreviewComponent {
  timeLeft: number = 30; // Start at 30 seconds
  interval: any;
  progress: number = 100; // Full bar at start

  ngOnInit(): void {
    this.startCountDown();
  }

  startCountDown(): void {
    const totalTime = 30; // Total time in seconds

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.progress = (this.timeLeft / totalTime) * 100; // Update progress
      } else {
        clearInterval(this.interval); // Stop when countdown reaches 0
      }
    }, 1000); // 1-second intervals
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
