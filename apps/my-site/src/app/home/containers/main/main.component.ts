import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../account/account.service';
import { CardService } from '../../../admin/card.service';
import { UserService } from '../../../auth/user.service';
import { Product, User } from '@safari-store/api-interfaces';

@Component({
  selector: 'safari-store-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  products: Product[] = [];
  currentUser!: User | null;

  constructor(
    private cardService: CardService,
    private userService: UserService,
    private accountService: AccountService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.cardService.getCards().subscribe((cards) => (this.products = cards));
    this.userService.getCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    });

  //   this.http.put('http://localhost:3333/api/products/62b43ada6d69c33a191d3027',
  //   {
  //     "colors": [ '62b46568c9a2281078514bb5', '62b46583c9a2281078514bb7']
  // }
  //   ).subscribe();
  }

  addToFavorites(id: string) {
    this.accountService.addFavoriteItem(id).subscribe();
  }

}

