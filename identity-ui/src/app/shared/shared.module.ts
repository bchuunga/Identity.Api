import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgbModule],
  exports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgbModule],
})
export class SharedModule {}
