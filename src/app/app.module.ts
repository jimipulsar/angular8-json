import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentListComponent } from './student-list/student-list.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from "ngx-spinner";
import { ApiService } from './services/api.service';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,MatMenuModule, MatFormFieldModule,MatDialogModule, MatInputModule, } from  '@angular/material';
import { DialogModalExampleComponent } from './dialog-modal-example/dialog-modal-example.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    DialogModalExampleComponent,
    StudentCreateComponent,
    StudentEditComponent,
    StudentListComponent
  ],
  imports: [
    MatToolbarModule,
    MatMenuModule,
    NgbModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,MatDialogModule, MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    FormsModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,HttpClientModule, BrowserAnimationsModule
  ],
  entryComponents: [
    DialogModalExampleComponent,
  ],
  exports : [
    MatMenuModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
