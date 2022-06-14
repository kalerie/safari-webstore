import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { CartItemsService } from 'src/app/checkout/cart-items.service';
import { DialogService } from '../../services/dialog-service/dialogService.service';
import { MiniCartComponent } from '../../../home/components/mini-cart/mini-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemsAmount?: number;

  constructor(private cartItemsService: CartItemsService,
    private router: Router,
    private userService: UserService,
    private dialog: DialogService) { }

  ngOnInit(): void {
    this.cartItemsService.cartUpdated.subscribe({
      next: () => { 
        this.cartItemsAmount = this.cartItemsService.countItemsAmount();
      }
    });

    this.cartItemsService.checkLocalStorageAndPopulateData();
    this.cartItemsAmount = this.cartItemsService.countItemsAmount();
  }

  navigationProfileClick() {
    if (this.userService.checkAuth()) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  dialogOpen() {
    const dialogRef = this.dialog.open(MiniCartComponent);
    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    })
  }

}
