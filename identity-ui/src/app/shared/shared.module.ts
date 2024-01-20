import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaErrorsComponent } from './components/ma-errors/ma-errors.component';
import { MaNotFoundComponent } from './components/ma-not-found/ma-not-found.component';
import { MaValidationMessagesComponent } from './components/ma-validation-messages/ma-validation-messages.component';

@NgModule({
  declarations: [
    MaErrorsComponent,
    MaNotFoundComponent,
    MaValidationMessagesComponent
  ],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgbModule],
  exports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgbModule],
})
export class SharedModule {}
