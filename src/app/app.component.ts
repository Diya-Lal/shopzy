import {Component, computed, effect, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // signals: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'shopzy';

  public testSignal = signal('test-signal');

  constructor() {
    const computedSignal = computed(() => {
      console.log('COMPUTED is being computed...');
      return 'computed ' + this.testSignal();
    });

    effect(() => {
      console.log('EFFECT is being executed...');
      console.log('computed value: ' + computedSignal());
    });
  }

  ngOnInit(): void {
    this.testSignal.set('test-signal-2');
    this.testSignal.set('test-signal-3');
    this.testSignal.set('test-signal-4');

    Promise.resolve().then(() => {
      this.testSignal.set('test-signal-in-promise');
    });

    setTimeout(() => {
      this.testSignal.set('test-signal-in-timeout');
    }, 0);
  }
}
