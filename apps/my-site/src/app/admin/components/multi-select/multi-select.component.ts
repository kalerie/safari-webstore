import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { DictionaryEntity } from '@safari-store/api-interfaces';

@Component({
  selector: 'admin-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit, OnChanges {
  isDropdownShow: boolean = false;
  public searchFilter: any = '';
  query!: string;
  @Output() onItemChange = new EventEmitter<any[]>();
  @Input() selectedItems: DictionaryEntity[] = [];
  @Input() items: DictionaryEntity[] = [];
  @Input() dropdownElTemplate!: TemplateRef<any>;
  @Input() selectedItemTemplate!: TemplateRef<any>;
  @Input() title: string = "";
  @Input() placeholder: string = "";
  private wasInside = false;

  clickInside() {
    this.wasInside = true;
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
    private eleRef: ElementRef,
  ) { }

  ngOnInit(): void {
      if(this.selectedItems.length > 0) {
        this.items = this.items.filter(el => {
               return !this.selectedItems.find(element => {
                return element._id === el._id;
                });
              });
      }
  }

  ngOnChanges(): void {
      if(this.selectedItems.length > 0) {
        this.items = this.items.filter(el => {
               return !this.selectedItems.find(element => {
                return element._id === el._id;
                });
              });
      }
  }

  selectRow (item: DictionaryEntity, event: Event) {
    if(!this.selectedItems.some(el => el._id == item._id)) {
      this.selectedItems.push(item);
      this.onItemChange.emit(this.selectedItems);
      let remainArr = this.items.filter(el => el !== item);
      this.items = remainArr;
    }
    event.stopPropagation();
  }

  removeSelectedItem(item: DictionaryEntity) {
    this.items.push(item);
    this.items.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    let remainArr = this.selectedItems.filter(el => el !== item);
    this.selectedItems = remainArr;
    this.onItemChange.emit(this.selectedItems);
  }

}
