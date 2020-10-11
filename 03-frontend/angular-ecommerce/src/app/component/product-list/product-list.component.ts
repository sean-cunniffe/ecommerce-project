import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from 'src/app/common/product';
import {ProductService} from 'src/app/services/product.service';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId = 1;
  previousCategoryId = 1;
  searchMode = false;

  // Properties for pagination
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 10;

  previousKeyword: string = null;


  constructor(private productService: ProductService,private cartService: CartService , private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });


  }

  // tslint:disable-next-line:typedef
  listProducts() {

    // checks if we are in search mode by checking for param keyword passes in route
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log(`search mode value= ${this.searchMode}`);
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }


  }

  // tslint:disable-next-line:typedef
  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    //if we have a different keyword than previous then set pageNumber = 1
    if(this.previousKeyword !=keyword){
      this.thePageNumber = 1;
    }
    this.previousKeyword = keyword;

    console.log(`keyword=${keyword} thePageNumber=${this.thePageNumber}`);

    // search for products using keyword
    this.productService.searchProductPaginate(this.thePageNumber -1,
                                             this.thePageSize,
                                              keyword).subscribe(this.processResult());


  }

  // tslint:disable-next-line:typedef
  handleListProducts() {
    // check if "id" parameter is available

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the id param string and convert to number
      // the + symbol means convert to number from string
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

    } else {
      // not a category, default cat id = 1
      this.currentCategoryId = 1;
    }

    // Check if we have different category id than previous
    // Angular will reuse a component if it is currently being viewed

    // if we have a different category than previous then we set the pagenumber = 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, the pageNumber=${this.thePageNumber}`);


    // -1 from thePageNumber because pagination in angular is 1 based and in spring its 0 based
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                                this.thePageSize,
                                                this.currentCategoryId).subscribe(this.processResult())



}
  private processResult() {
    return data => {
    this.products = data._embedded.products;
    this.thePageNumber = data.page.number + 1;
    this.thePageSize = data.page.size;
    this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    console.log('page size '+pageSize)
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts(); // refresh list because pageSize and number has changed
  }

  addToCart(product: Product) {

    console.log("adding to cart: "+product.name + " "+product.unitPrice);

    const cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);

  }
}

