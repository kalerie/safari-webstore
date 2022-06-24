import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormType } from '../../../common/form-type.enum';
import { Color } from '../../../common/interfaces/color.interface';
import { NotificationService } from '../../../common/services/notification.service';
import { ColorService } from '../../color.service';

@Component({
  selector: 'admin-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.scss']
})
export class ColorFormComponent implements OnInit {
  newColorForm!: FormGroup;
  itemId?: string;
  public formTypeEnum = FormType;
  public routeType = this.route.snapshot.data['type'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private colorService: ColorService,
    private notifyService: NotificationService
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
        this.itemId = params['id'];
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

  updateColor(color: Color) {
    this.colorService.updateColor(this.itemId as string, color).subscribe(() => {
      this.colorService.updateChange.next();
      this.notifyService.showSuccess('Item was updated');
    });
    
  }

  addColor(color: Color) {
    this.colorService.addColor(color).subscribe(() => {
      this.colorService.updateChange.next();
      this.newColorForm.reset();
      this.notifyService.showSuccess('Item was added');
    });
    
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
