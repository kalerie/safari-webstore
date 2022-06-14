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
  highlightRow!: number;

  constructor(
    private router: Router,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.subscribeRouteChange();
    this.subscribeUpdateChange();
    this.colorService.getColors().subscribe((colors) => (this.colors = colors));
  }

  subscribeRouteChange() {
    this.colorService.routeChange.subscribe((id) => {
      this.highlightRow = id;
    });
  }

  subscribeUpdateChange() {
    this.colorService.updateChange.subscribe({
      next: () => { 
        this.colorService.getColors().subscribe((colors) => (this.colors = colors))
      }
    });
  }

  newColorForm() {
    this.router.navigate(['/admin/colors/new']);
  }

  selectRow(index: number) {
    this.highlightRow = index;
    this.router.navigate(['/admin/colors/', index]);
  }

  deleteColor(id: number, event: Event) {
    this.colorService
      .deleteColor(id as number)
      .subscribe(() => {
        this.colors = this.colors.filter(t => t.id !== id)
        if(this.router.url == `/admin/colors/${id}`){
          this.router.navigate(['/admin/colors']);
        }
      })
    event.stopPropagation();
  }

}
