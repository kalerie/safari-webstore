import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product.interface';
import { CardService } from 'src/app/admin/card.service';
import { UserService } from 'src/app/auth/user.service';
import { User } from 'src/app/common/interfaces/user.interface';
import { AccountService } from 'src/app/account/account.service';
import { Favorit } from 'src/app/common/interfaces/favorit.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  products: Product[] = [];
  currentUser!: User | null;

  constructor(private cardService: CardService,
    private userService: UserService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.cardService.getCards().subscribe((cards) => (this.products = cards));
    this.userService.getCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
    
  }

  addToFavorites(id: number) {
    const favorit: Favorit = {
      userId: this.currentUser!.id as number,
      productId: id
    }
    this.accountService.addFavoriteItem(favorit).subscribe();
  }

}

