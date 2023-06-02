import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { Product, ProductsAPIList } from './products.interfaces';

const PRODUCT_API = 'https://codingFactory.ddns.net/api/product'

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<ProductsAPIList>(`${PRODUCT_API}/findall`).pipe(delay(1000));
  }

  insertProduct(product: Product) {
    return this.http.post<ProductsAPIList>(`${PRODUCT_API}/create`, product);
  }

}
