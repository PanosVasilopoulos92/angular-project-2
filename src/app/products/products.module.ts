import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from './products.service';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductInsertComponent } from './product-insert/product-insert.component';

const routes: Routes = [
  {path: 'products-list', component: ProductsListComponent},
  {path: 'products-insert', component: ProductInsertComponent},
]

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductInsertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [      // Here we write the Services for the specific module.
    ProductsService
  ]
})
export class ProductsModule { }
