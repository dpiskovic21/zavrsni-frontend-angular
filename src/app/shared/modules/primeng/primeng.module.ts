import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    MultiSelectModule,
    ToastModule,
    DynamicDialogModule,
  ],
  exports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    MultiSelectModule,
    ToastModule,
    DynamicDialogModule,
  ],
})
export class PrimengModule {}
