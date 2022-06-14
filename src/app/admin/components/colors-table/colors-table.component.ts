import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/common/interfaces/color.interface';
import { ColorService } from '../../color.service';

@Component({
  selector: 'admin-colors-table',
  templateUrl: './colors-table.component.html',
  styleUrls: ['./colors-table.component.scss']
})
export class ColorsTableComponent implements OnInit {
  colors: Color[] = [];
  titles = ['#','Title', 'Value'];
  HighlightRow!: number;

  constructor(private router: Router,
    private colorService: ColorService) { }

  ngOnInit(): void {
    this.colorService.routeChange.subscribe((id) => {
      this.HighlightRow = id;
    });
    this.colorService.getColors().subscribe((colors) => (this.colors = colors));
    this.colorService.updateChange.subscribe({
      next: () => { 
        this.colorService.getColors().subscribe((colors) => (this.colors = colors))
      }
    });
  }

  newColorForm() {
    this.router.navigate(['/admin/colors/new']);
  }

  selectRow(index: any) {
    this.HighlightRow = index;
    this.router.navigate(['/admin/colors/', index]);
  }

  deleteItem (item: Color, event: Event) {
    this.colorService
      .deleteItem(item)
      .subscribe(() => {
        this.colors = this.colors.filter(t => t.id !== item.id)
        this.router.navigate(['/admin/colors']);
      })
    event.stopPropagation();
  }

}
