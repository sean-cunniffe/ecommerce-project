import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService
              ) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  private listCartDetails() {
    //get a handle to the cart details
    this.cartItems = this.cartService.cartItems;
    // sub to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //sub to the totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    //compute cart total and price quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}
