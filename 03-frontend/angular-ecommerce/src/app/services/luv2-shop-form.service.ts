import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Country} from '../common/country';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {State} from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private stateUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) {
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    //build an array for "month" dropdown list

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data); // of(data) wraps data in an observable so it can be subscribed to
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }

    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(countryCode: number): Observable<State[]>{
    const searchStatesUrl = `${this.stateUrl}/search/findByCountryCode?code=${countryCode}`;

    return this.httpClient.get<GetResponseState>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    )
  }

}

interface GetResponseCountries {

  _embedded: {
    countries: Country[];
  }
}

interface GetResponseState{

  _embedded: {
    states: State[];
  }
}
