import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef } from '../../../common/services/dialog-service/dialogRef';
import { DIALOG_DATA } from '../../../common/services/dialog-service/dialogToken';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

  constructor(private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: string
    ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
