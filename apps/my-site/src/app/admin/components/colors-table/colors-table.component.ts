import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from '../../color.service';
import { Store } from '@ngrx/store';
import { loadColors, removeColor } from '../../../store/actions/colors.actions';
import { getColors } from '../../../store/selectors/products-table.selector';

@Component({
  selector: 'admin-colors-table',
  templateUrl: './colors-table.component.html',
  styleUrls: ['./colors-table.component.scss']
})
export class ColorsTableComponent implements OnInit {
  colors$ = this.store.select(getColors);
  titles = ['#','Title', 'Value'];
  highlightRow!: string;


  constructor(
    private router: Router,
    private colorService: ColorService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadColors());
    this.subscribeRouteChange();
  }

  subscribeRouteChange() {
    this.colorService.routeChange.subscribe((id) => {
      this.highlightRow = id;
    });
  }

  newColorForm() {
    this.router.navigate(['/admin/colors/new']);
  }

  selectRow(index: string) {
    this.highlightRow = index;
    this.router.navigate(['/admin/colors/', index]);
  }

  deleteColor(id: string, event: Event) {
    this.store.dispatch(removeColor({ _id: id }));
    event.stopPropagation();
  }

}
