import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {ProductsListComponent} from "./products-list";
import {OfferPreviewComponent} from "./offer-preview/offer-preview.component";
import {ProductsService} from "./products.service";
import {CarouselModule} from "primeng/carousel";
import {ExclusiveOfferComponent} from "./exclusive-offer/exclusive-offer.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ProductsListComponent,
    OfferPreviewComponent,
    CarouselModule,
    ExclusiveOfferComponent

  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public products: any[] = [];
  public responsiveOptions: any[] = [];
  public isShow = false;
  public networkSpeed?: string;
  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products
    });
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  getConnectionSpeed(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    if (connection) {
      return connection.effectiveType;  // Values like 'slow-2g', '2g', '3g', '4g'
    }

    return 'unknown'; // Default if API is not supported
  }

  onShowProdcuts() {
    this.networkSpeed = this.getConnectionSpeed();
  }
}
