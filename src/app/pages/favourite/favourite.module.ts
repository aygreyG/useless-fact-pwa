import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouriteRoutingModule } from './favourite-routing.module';
import { FavouriteComponent } from './favourite.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    FavouriteComponent
  ],
  imports: [
    CommonModule,
    FavouriteRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class FavouriteModule { }
