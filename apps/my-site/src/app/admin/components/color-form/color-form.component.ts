import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormType } from '../../../common/form-type.enum';
import { NotificationService } from '../../../common/services/notification.service';
import { ColorService } from '../../color.service';
import { CreateColorDto, UpdateColorDto } from '@safari-store/api-interfaces';
import { Store } from '@ngrx/store';
import { addColor, updateColor } from '../../../store/actions/colors.actions';

@Component({
  selector: 'admin-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.scss']
})
export class ColorFormComponent implements OnInit {
  newColorForm!: FormGroup;
  colorId?: string;
  public formTypeEnum = FormType;
  public routeType = this.route.snapshot.data['type'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private colorService: ColorService,
    private notifyService: NotificationService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.subscribeRouteParamsChange();
    this.initForm();
  }

  initForm() {
    this.newColorForm = this.fb.group({
      title: '',
      value: ''
    })
  }

  subscribeRouteParamsChange() {
    this.route.params.subscribe((params) => {
      this.colorService.routeChange.next(params['id']);
      if (params['id']) {
        this.colorId = params['id'];
        this.getCardAndPatchForm(params['id']);
      }
    })
  }

  getCardAndPatchForm(id: number) {
    this.colorService.getColor(id).subscribe((item) => {
      this.newColorForm.patchValue({
        title: item.title,
        value: item.value,
      })
    })
  }

  updateColor(color: UpdateColorDto) {
    this.store.dispatch(updateColor({ color: color, _id: this.colorId as string }));
  }

  addColor(color: CreateColorDto) {
    this.store.dispatch(addColor({ color: color }));
    this.newColorForm.reset();
  }

  submit() {
    const item = this.newColorForm.value;
    if(this.routeType === this.formTypeEnum.CREATE) {
      this.addColor(item);
    } else {
       this.updateColor(item);
      }
  }

  cancel() {
    this.router.navigate(['/admin/colors']);
  }

}
