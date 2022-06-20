import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/admin/card.service';
import { ColorService } from 'src/app/admin/color.service';
import { SizeService } from 'src/app/admin/size.service';
import { Color } from 'src/app/common/interfaces/color.interface';
import { Product } from 'src/app/common/interfaces/product.interface';
import { Size } from 'src/app/common/interfaces/size.interface';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit {
  products: Product[] = [];

  sizes: Size[] = [];
  colors: Color[] = [];
  categories = ['Facemask','Jewelry', 'Watches', 'Hair accessories', 'Belts', 'Backpacks', 'Handbags', 'Fragrances', 'Sunglasses & eyewears', 'Socks', 'Hats and beanies', 'Gloves' ];


  constructor(
    private cardService: CardService,
    private sizeService: SizeService,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.cardService.getAccessoriesCards().subscribe((cards) => {
      this.products = cards;
    });
    this.sizeService.getSizes().subscribe((sizes) => {
      this.sizes = sizes;
    })
    this.colorService.getColors().subscribe((colors) => {
      this.colors = colors;
    })


  }

}
