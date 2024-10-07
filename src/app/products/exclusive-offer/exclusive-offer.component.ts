import { Component } from '@angular/core';
import {ProgressBar, ProgressBarModule} from "primeng/progressbar";
import {MessagesModule} from "primeng/messages";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-exclusive-offer',
  standalone: true,
  imports: [MessagesModule, CardModule],
  templateUrl: './exclusive-offer.component.html',
  styleUrl: './exclusive-offer.component.scss'
})
export class ExclusiveOfferComponent {
  public messages = [{severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'}];
}
