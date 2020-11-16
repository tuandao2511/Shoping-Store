import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = `${apiUrl}/product`;
  private categoryUrl = `${apiUrl}/category`;



  constructor(private http: HttpClient) {

  }

  getAllInPage(page: number, size: number) : Observable<any>{

  }
}
