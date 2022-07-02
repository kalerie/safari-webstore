import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormType } from '../../../common/form-type.enum';
import { NotificationService } from '../../../common/services/notification.service';
import { SizeService } from '../../size.service';
import { CreateSizeDto, UpdateSizeDto } from '@safari-store/api-interfaces';
import { Store } from '@ngrx/store';
import { addSize, updateSize } from '../../../store/actions/sizes.actions';

@Component({
  selector: 'admin-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.scss']
})
export class SizeFormComponent implements OnInit {
  newSizeForm!: FormGroup;
  sizeId?: string;
  public formTypeEnum = FormType;
  public routeType = this.route.snapshot.data['type'];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private sizeService: SizeService,
    private notifyService: NotificationService,
    private store: Store
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

  updateSize(size: UpdateSizeDto) {
    this.store.dispatch(updateSize({ size: size, _id: this.sizeId as string }));
  }

  addSize(size: CreateSizeDto) {
    this.store.dispatch(addSize({ size: size }));
    this.newSizeForm.reset();
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
