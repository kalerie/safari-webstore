import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'home-nav-arrow',
  templateUrl: './nav-arrow.component.html',
  styleUrls: ['./nav-arrow.component.scss']
})
export class NavArrowComponent implements OnInit {
  

  constructor(private viewport: ViewportScroller) { }

  ngOnInit(): void {
  }

  scrollTop() {
    this.viewport.scrollToPosition([0,0]);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(document.body.scrollTop > 1200 ||     
        document.documentElement.scrollTop >= 1200) {
          document.getElementById('arrow')?.classList.add('nav-arrow--fixed');
          document.getElementById('arrow')?.classList.remove('nav-arrow--hidden');
        }
      else if(document.body.scrollTop ||     
      document.documentElement.scrollTop < 1200){
        document.getElementById('arrow')?.classList.add('nav-arrow--hidden');
        document.getElementById('arrow')?.classList.remove('nav-arrow--fixed');
      }
    }
  
}
