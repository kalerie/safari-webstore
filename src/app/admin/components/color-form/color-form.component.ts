import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/common/interfaces/color.interface';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ColorService } from '../../color.service';

@Component({
  selector: 'app-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.scss']
})
export class ColorFormComponent implements OnInit {
  newColorForm!: FormGroup;
  itemId?: number;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private colorService: ColorService,
    private notifyService: NotificationService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.colorService.routeChange.next(params['id']);
      if (params['id']) {
        this.itemId = params['id'];
        this.getCardAndPatchForm(params['id']);
      }
    })

    this.newColorForm = this.fb.group({
      title: '',
      value: ''
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

  updateItem(item: Color) {
    this.colorService.updateItem(item, this.itemId as number).subscribe(() => {
      this.colorService.updateChange.next();
    });
    this.notifyService.showSuccess('Item was updated');
  }

  addItem(item: Color) {
    this.colorService.addItem(item).subscribe(() => {
      this.colorService.updateChange.next();
      this.newColorForm.reset();
    });
    this.notifyService.showSuccess('Item was added');
  }

  submit() {
    const item = this.newColorForm.value;
    if(this.route.snapshot.data['type']==='create') {
      this.addItem(item);
    } else {
       this.updateItem(item);
      }
  }

  cancel() {
    this.router.navigate(['/admin/colors']);
  }

}
