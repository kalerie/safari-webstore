import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Size } from 'src/app/common/interfaces/size.interface';
import { NotificationService } from 'src/app/common/services/notification.service';
import { SizeService } from '../../size.service';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.scss']
})
export class SizeFormComponent implements OnInit {
  newSizeForm!: FormGroup;
  itemId?: number;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private sizeService: SizeService,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sizeService.routeChange.next(params['id']);
      if (params['id']) {
        this.itemId = params['id'];
        this.getCardAndPatchForm(params['id']);
      }
    })

    this.newSizeForm = this.fb.group({
      title: '',
      value: ''
    })
  }

  getCardAndPatchForm(id: number) {
    this.sizeService.getSize(id).subscribe((item) => {
      this.newSizeForm.patchValue({
        title: item.title,
        value: item.value,
      })
    })
  }

  updateItem(item: Size) {
    this.sizeService.updateItem(item, this.itemId as number).subscribe(() => {
      this.sizeService.updateChange.next();
    });
    this.notifyService.showSuccess('Item was updated');
  }

  addItem(item: Size) {
    this.sizeService.addItem(item).subscribe(() => {
      this.sizeService.updateChange.next();
      this.newSizeForm.reset();
    });
    this.notifyService.showSuccess('Item was added');
  }

  submit() {
    const item = this.newSizeForm.value;
    if(this.route.snapshot.data['type']==='create') {
      this.addItem(item);
    } else {
       this.updateItem(item);
      }
  }

  cancel() {
    this.router.navigate(['/admin/sizes']);
  }

}
