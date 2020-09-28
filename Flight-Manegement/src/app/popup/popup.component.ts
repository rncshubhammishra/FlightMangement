import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onLoginClick():void{
    this.dialogRef.close("login");
  }
  onGuestClick():void{
    this.dialogRef.close("guest");
  }

}
