import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from '../../color.service';
import { Color } from '@safari-store/api-interfaces';

@Component({
  selector: 'admin-colors-table',
  templateUrl: './colors-table.component.html',
  styleUrls: ['./colors-table.component.scss']
})
export class ColorsTableComponent implements OnInit {
  colors: Color[] = [];
  titles = ['#','Title', 'Value'];
  highlightRow!: string;

  constructor(
    private router: Router,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.subscribeRouteChange();
    this.subscribeDataShouldUpdate();
    this.colorService.getColors().subscribe((colors) => (this.colors = colors));
  }

  subscribeRouteChange() {
    this.colorService.routeChange.subscribe((id) => {
      this.highlightRow = id;
    });
  }

  subscribeDataShouldUpdate() {
    this.colorService.updateChange.subscribe({
      next: () => {
        this.colorService.getColors().subscribe((colors) => (this.colors = colors))
      }
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
    this.colorService
      .deleteColor(id)
      .subscribe(() => {
        this.colors = this.colors.filter(t => t._id !== id)
        if(this.router.url == `/admin/colors/${id}`){
          this.router.navigate(['/admin/colors']);
        }
      })
    event.stopPropagation();
  }

}
