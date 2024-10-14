import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {ProductsListComponent} from "./products-list";
import {OfferPreviewComponent} from "./offer-preview/offer-preview.component";
import {ProductsService} from "./products.service";
import {CarouselModule} from "primeng/carousel";
import {ExclusiveOfferComponent} from "./exclusive-offer/exclusive-offer.component";
import {LimitedProductsModule} from "./limited-products/limited-products.module";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ProductsListComponent,
    OfferPreviewComponent,
    CarouselModule,
    ExclusiveOfferComponent,
    LimitedProductsModule

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

  public ngOnInit(): void {
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

  /**
   * Returns the connection speed of the user.
   */
  public getConnectionSpeed(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    if (connection) {
      return connection.effectiveType;
    }

    return 'unknown';
  }

  /**
   * Shows the list of products when the button is clicked.
   */
  public onShowProdcuts() : void   {
    this.networkSpeed = this.getConnectionSpeed();
  }
}
