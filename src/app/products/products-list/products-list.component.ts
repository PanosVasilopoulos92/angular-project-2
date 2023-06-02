import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product, ProductsAPIList } from '../products.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy{

  constructor(private productsService: ProductsService) {}

  loading = false;
  productsList: Product[] = [];
  subscription: Subscription | undefined;

  costSortType: 'asc' | 'desc' = 'asc';
  quantitySortType: 'asc' | 'desc' = 'asc';
  productSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log("Api call has started.");
    this.loading = true;
    this.subscription = this.productsService.findAll().subscribe({
      next: (apiData: ProductsAPIList) => {
        const {status, data} = apiData;
        this.productsList = data;
        console.log(status, data);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.")
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();     // '?' if not undefined make unsubscribe.
  }

  toggleSort(key: string) {
    switch(key) {
      case 'cost':
        this.costSortType = this.costSortType === 'asc' ? 'desc' : 'asc';
        this.productsList = orderBy(this.productsList, [key], [this.costSortType]);
        break;
      case 'quantity':
        this.quantitySortType = this.quantitySortType === 'asc' ? 'desc' : 'asc';
        this.productsList = orderBy(this.productsList, [key], [this.quantitySortType]);
        break;
      case 'product':
        this.productSortType = this.productSortType === 'asc' ? 'desc' : 'asc';
        this.productsList = orderBy(this.productsList, [key], [this.productSortType]);
        break;
      default:
        break;
    }
  }


}
