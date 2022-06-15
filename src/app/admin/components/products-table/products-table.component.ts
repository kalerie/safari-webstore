import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from '../../../common/interfaces/product.interface';
import { CardService } from '../../card.service';

@Component({
  selector: 'admin-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  cards: Product[] = [];
  titles = ['#','Title', 'Price', 'ImageUrl'];
  highlightRow!: number;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscribeRouteChange();
    this.subscribeDataShouldUpdate();
    this.cardService.getCards().subscribe((cards) => (this.cards = cards));
  }

  subscribeRouteChange() {
    this.cardService.routeChange.subscribe((id) => {
      this.highlightRow = id;
    });
  }

  subscribeDataShouldUpdate() {
    this.cardService.updateChange.subscribe({
      next: () => { 
        this.cardService.getCards().subscribe((cards) => (this.cards = cards))
      }
    });
  }

  selectRow(index: number) {
    this.highlightRow = index;
    this.router.navigate(['/admin/products/', index]);
  }
  
  newCardForm() {
    this.router.navigate(['/admin/products/new']);
  }

  deleteCard(card: Product, event: Event) {
    this.cardService
      .deleteCard(card)
      .subscribe(() => {
        this.cards = this.cards.filter(t => t.id !== card.id)
        this.router.navigate(['/admin/products']);
      })
      
    event.stopPropagation();

  }
}
