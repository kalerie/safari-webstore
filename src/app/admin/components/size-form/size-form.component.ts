import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormType } from 'src/app/common/form-type.enum';
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
  sizeId?: number;
  public formTypeEnum = FormType;
  public routeType = this.route.snapshot.data['type'];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private sizeService: SizeService,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.subscribeRouteParamsChange();
    this.initForm();
  }

  initForm() {
    this.newSizeForm = this.fb.group({
      title: '',
      value: ''
    })
  }

  subscribeRouteParamsChange() {
    this.route.params.subscribe((params) => {
      this.sizeService.routeChange.next(params['id']);
      if (params['id']) {
        this.sizeId = params['id'];
        this.getCardAndPatchForm(params['id']);
      }
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

  updateSize(size: Size) {
    this.sizeService.updateSize(this.sizeId as number, size).subscribe(() => {
      this.sizeService.updateChange.next();
      this.notifyService.showSuccess('Item was updated');
    });
    
  }

  addSize(size: Size) {
    this.sizeService.addSize(size).subscribe(() => {
      this.sizeService.updateChange.next();
      this.newSizeForm.reset();
      this.notifyService.showSuccess('Item was added');
    });
    
  }

  submit() {
    const size = this.newSizeForm.value;
    if(this.routeType === this.formTypeEnum.CREATE) {
      this.addSize(size);
    } else {
       this.updateSize(size);
      }
  }

  cancel() {
    this.router.navigate(['/admin/sizes']);
  }

}
