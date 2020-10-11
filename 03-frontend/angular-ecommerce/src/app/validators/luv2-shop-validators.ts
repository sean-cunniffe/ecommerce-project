import {FormControl, ValidationErrors} from '@angular/forms';

export class Luv2ShopValidators {

  //whitespace validator
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors {

    if((control.value != null) && (control.value.trim().length === 0) ){
      // validationError key: 'notOnlyWhiteSpace
      return { 'notOnlyWhiteSpace': true};
    }else{
      //valid, return null
      return null;
    }
  }

}
