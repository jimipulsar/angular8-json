
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material';
import { DialogModalExampleComponent } from './dialog-modal-example/dialog-modal-example.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  dialogValue:string; 
  sendValue:string;

  opened = true;
  @ViewChild('sidenav', {static:false}) sidenav: MatSidenav;
  constructor(
    public dialog: MatDialog
    ) { }
  ngOnInit() {

    console.log(window.innerWidth)

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogModalExampleComponent, {
      width: '250px',
      backdropClass:'custom-dialog-backdrop-class',
      panelClass:'custom-dialog-panel-class',
      data: {pageValue: this.sendValue}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.dialogValue = result.data;
    });
  }

}
