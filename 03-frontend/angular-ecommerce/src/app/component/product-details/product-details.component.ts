import { Component, OnInit } from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // why create a new Product?
  // when we first load the product-detail.component.html the product is null
  // when the html tries to load it up an error is thrown as the product hasnt come in yet
  // this is because of the synchronise data retrieval
  // this is known as --- RACE CONDITION ---
  product: Product = new Product();

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });

  }

  // tslint:disable-next-line:typedef
  private handleProductDetails() {

    // get id param string and convert to a number
    const productId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    );

  }

  addToCart() {
    const cartItem: CartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }
}
