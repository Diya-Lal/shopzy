import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MenubarModule} from "primeng/menubar";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    MenubarModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  public items: any;

  public ngOnInit() {
    // this.items = [
    //   {
    //     label: 'Products',
    //     icon: 'pi pi-server'
    //   },
    //   {
    //     label: 'Signals',
    //     icon: 'pi-wave-pulse'
    //   },
    // ]
  }
}
