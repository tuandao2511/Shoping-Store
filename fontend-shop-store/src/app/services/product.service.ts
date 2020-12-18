import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { ProductInfo } from '../models/ProductInfo';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = `${apiUrl}/product`;
  private categoryUrl = `${apiUrl}/category`;

  constructor(private http: HttpClient) {
  
  }

  getAllInPage(page: number, size: number) : Observable<any>{
    const url = `${this.productUrl}?page=${page}&size=${size}`;
    return this.http.get(url).pipe()
  }

  getCategoryInPage(categoryType: string, page: number, size: number): Observable<any> {
    const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
    return this.http.get(url).pipe(
        // tap(data => console.log(data))
    );
  }

  getDetail(id: String): Observable<ProductInfo> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<ProductInfo>(url).pipe(
        catchError(_ => {
            console.log("Get Detail Failed");
            return of(new ProductInfo());
        })
    );
  }

  delelte(productInfo: ProductInfo): Observable<any> {
    const url = `${apiUrl}/seller/product/${productInfo.productId}/delete`;
    return this.http.delete(url);
  }

  update(productInfo: ProductInfo): Observable<ProductInfo> {
    const url = `${apiUrl}/seller/product/${productInfo.productId}/edit`;
    return this.http.put<ProductInfo>(url, productInfo);
  }

  create(productInfo: ProductInfo): Observable<ProductInfo> {
    const url = `${apiUrl}/seller/product/new`;
    return this.http.post<ProductInfo>(url, productInfo);
  }
}
