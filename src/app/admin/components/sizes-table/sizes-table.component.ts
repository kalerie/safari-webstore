import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Size } from 'src/app/common/interfaces/size.interface';
import { SizeService } from '../../size.service';

@Component({
  selector: 'admin-sizes-table',
  templateUrl: './sizes-table.component.html',
  styleUrls: ['./sizes-table.component.scss']
})
export class SizesTableComponent implements OnInit {
  sizes: Size[] = [];
  titles = ['#','Title', 'Value'];
  HighlightRow!: number;

  constructor(
    private router: Router,
    private sizeService: SizeService
  ) { }

  ngOnInit(): void {
    this.sizeService.routeChange.subscribe((id) => {
      this.HighlightRow = id;
    });
    this.sizeService.getSizes().subscribe((sizes) => (this.sizes = sizes));
    this.sizeService.updateChange.subscribe({
      next: () => { 
        this.sizeService.getSizes().subscribe((sizes) => (this.sizes = sizes))
      }
    });
  }

  newSizeForm() {
    this.router.navigate(['/admin/sizes/new']);
  }

  selectRow(index: any) {
    this.HighlightRow = index;
    this.router.navigate(['/admin/sizes/', index]);
  }

  deleteItem (item: Size, event: Event) {
    this.sizeService
      .deleteItem(item)
      .subscribe(() => {
        this.sizes = this.sizes.filter(t => t.id !== item.id)
        this.router.navigate(['/admin/sizes']);
      })
    event.stopPropagation();
  }

}
