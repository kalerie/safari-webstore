import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Size } from '../../../common/interfaces/size.interface';
import { SizeService } from '../../size.service';

@Component({
  selector: 'admin-sizes-table',
  templateUrl: './sizes-table.component.html',
  styleUrls: ['./sizes-table.component.scss']
})
export class SizesTableComponent implements OnInit {
  sizes: Size[] = [];
  titles = ['#','Title', 'Value'];
  highlightRow!: string;

  constructor(
    private router: Router,
    private sizeService: SizeService
  ) { }

  ngOnInit(): void {
    this.subscribeRouteChange();
    this.subscribeDataShouldUpdate();
    this.sizeService.getSizes().subscribe((sizes) => (this.sizes = sizes));
  }

  subscribeRouteChange() {
    this.sizeService.routeChange.subscribe((id) => {
      this.highlightRow = id;
    });
  }

  subscribeDataShouldUpdate() {
    this.sizeService.updateChange.subscribe({
      next: () => { 
        this.sizeService.getSizes().subscribe((sizes) => (this.sizes = sizes))
      }
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
    this.sizeService
      .deleteSize(id)
      .subscribe(() => {
        this.sizes = this.sizes.filter(t => t._id !== id)
        if(this.router.url == `/admin/sizes/${id}`){
          this.router.navigate(['/admin/sizes']);
        }
      })
    event.stopPropagation();
  }

}