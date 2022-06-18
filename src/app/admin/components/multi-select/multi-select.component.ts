import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from 'src/app/common/interfaces/color.interface';
import { ColorService } from '../../color.service';

export interface BaseEntity {
  id?: number;
  title: string;
  value: string;
}

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  
  isDropdownShow: boolean = false;

  public searchFilter: any = '';
  query!: string;
  @Output() onItemChange = new EventEmitter<Color[]>();
  @Input() selectedItems: BaseEntity[] = [];
  @Input() items: BaseEntity[] = [];
  @Input() dropdownElTemplate!: TemplateRef<any>;
  @Input() selectedItemTemplate!: TemplateRef<any>;
  @Input() title: string = "";
  @Input() placeholder: string = "";

  private wasInside = false;
  // @HostListener('click')
  clickInside() {
    this.wasInside = true;

    // let inputContainerEl = this.eleRef.nativeElement.querySelector('#input') as HTMLElement;
    let containerDropdownEl = this.eleRef.nativeElement.querySelector('#dropdown') as HTMLElement;
    if(containerDropdownEl.classList.contains("active")) {
      containerDropdownEl.classList.remove('active');
      this.isDropdownShow = false;
    } else {
      containerDropdownEl.classList.add('active');
      this.isDropdownShow = true;
    }
    
  }
  
  @HostListener('document:click')
  clickout() {
    let containerDropdownEl = this.eleRef.nativeElement.querySelector('#dropdown') as HTMLElement;
    if (!this.wasInside) {
      containerDropdownEl.classList.remove('active');
      this.isDropdownShow = false;
    }
    this.wasInside = false;
  }

  constructor(
    private formBuilder : FormBuilder,
    private eleRef: ElementRef,
  ) { }

  ngOnInit(): void {
      if(this.selectedItems.length > 0) {
        this.items = this.items.filter(el => {
               return !this.selectedItems.find(element => {
                return element.id === el.id;
                });
              });
          console.log(this.items, 'result of filter');
      }
    
  }


  selectRow (item: BaseEntity, event: Event) {
    if(!this.selectedItems.some(el => el.id == item.id)) {
      this.selectedItems.push(item);
      this.onItemChange.emit(this.selectedItems);
      let remainArr = this.items.filter(el => el !== item);
      this.items = remainArr;
    }
    event.stopPropagation();
  }

  removeSelectedItem(item: BaseEntity) {
    console.log(this.items);
      
    console.log('here');
    this.items.push(item);
    this.items.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    
      
    let remainArr = this.selectedItems.filter(el => el !== item);
    this.selectedItems = remainArr;
    this.onItemChange.emit(this.selectedItems);
    
  }



}
