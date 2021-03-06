import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../common/interfaces/product.interface';
import { CardService } from '../../card.service';
import { NotificationService } from 'src/app/common/services/notification.service';


@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  newCardForm!: FormGroup;
  cardId?: number;

  constructor(private fb: FormBuilder,
    private cardService: CardService,
    public route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService) {
      
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cardService.routeChange.next(params['id']);
      if (params['id']) {
        this.cardId = params['id'];
        this.getCardAndPatchForm(params['id']);
      }
    })

    this.newCardForm = this.fb.group({
      title: '',
      price: '',
      imageUrl: ''
    })
    
  }

  updateCard(card: Product) {
    this.cardService.updateCard(card, this.cardId as number).subscribe(() => {
      this.cardService.updateChange.next();
    });
    this.notifyService.showSuccess('Card was updated');
  }
 
  getCardAndPatchForm(id: number) {
    this.cardService.getCard(id).subscribe((card) => {
      this.newCardForm.patchValue({
        title: card.title,
        price: card.price,
        imageUrl: card.imageUrl
      })
    })
  }

  addCard(card: Product) {
    this.cardService.addCard(card).subscribe(() => {
      this.cardService.updateChange.next();
      this.newCardForm.reset();
    });
    this.notifyService.showSuccess('Card was added');
  }

  submit(): void {
    const card = this.newCardForm.value;
    if(this.route.snapshot.data['type']==='create') {
      this.addCard(card);
    } else {
       this.updateCard(card);
      }
  }

  cancel(){
    this.router.navigate(['/admin/products']);
  }

}
