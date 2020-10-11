import { Injectable } from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  // sub-class of observable // use to publish events // event will be sent to as subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() {

  }

  addToCart(cartItem: CartItem) {
    // check if we already have item in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === cartItem.id );
    }
    // check if we found it
    alreadyExistsInCart = (existingCartItem != undefined);

    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();

  }


  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue); // publish event for subscribers of totalPrice
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalQuantityValue, totalPriceValue);

  }

  private logCartData(totalQuantityValue: number, totalPriceValue: number) {
    for(let tempCartItem of this.cartItems){
      console.log(`name ${tempCartItem.name}, quantity ${tempCartItem.quantity}`)
    }
    console.log(`totalQuantityValue ${totalQuantityValue} totalPriceValue ${totalPriceValue}`);

  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if(cartItem.quantity === 0){
      this.remove(cartItem);
    }
  }

  remove(cartItem: CartItem) {
    // get index of item in array
    const index = this.cartItems.findIndex( tempCartItem => tempCartItem.id === cartItem.id);

    if(index > -1){
      this.cartItems.splice(index,1);
    }

    this.computeCartTotals();
  }
}
