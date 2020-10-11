import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category ID

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number): Observable<GetResponseProduct> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                          + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(keyword: string): Observable<Product[]>{

  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
  console.log(searchUrl);
  return this.getProducts(searchUrl);

  }

  searchProductPaginate(thePage: number,
                         thePageSize: number,
                         keyword: string): Observable<GetResponseProduct> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  private getProducts(url: string) {
    return this.httpClient.get<GetResponseProduct>(url).pipe(
      map(response => response._embedded.products)
    );
  }

  // tslint:disable-next-line:typedef
  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
   }
}

interface GetResponseProduct {

  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };

}

interface GetResponseProductCategory {

  _embedded: {
    productCategory: ProductCategory[];
  };

}


