import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SizeService } from '../../size.service';
import { Store } from '@ngrx/store';
import { loadSizes, removeSize } from '../../../store/actions/sizes.actions';
import { getSizes } from '../../../store/selectors/products-table.selector';

@Component({
  selector: 'admin-sizes-table',
  templateUrl: './sizes-table.component.html',
  styleUrls: ['./sizes-table.component.scss']
})
export class SizesTableComponent implements OnInit {
  sizes$ = this.store.select(getSizes);
  titles = ['#','Title', 'Value'];
  highlightRow!: string;


  constructor(
    private router: Router,
    private sizeService: SizeService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadSizes());
    this.subscribeRouteChange();
  }

  subscribeRouteChange() {
    this.sizeService.routeChange.subscribe((id) => {
      this.highlightRow = id;
    });
  }

  newSizeForm() {
    this.router.navigate(['/admin/sizes/new']);
  }

  selectRow(index: string) {
    this.highlightRow = index;
    this.router.navigate(['/admin/sizes/', index]);
  }

  deleteSize (id: string, event: Event) {
    this.store.dispatch(removeSize({ _id: id }));
    event.stopPropagation();
  }

}
