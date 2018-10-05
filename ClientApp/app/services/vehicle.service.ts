import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
// {
//   providedIn: 'root'
// })
export class VehicleService {

  constructor(private http : Http) { }

  getMakes() {
    return this.http.get('/api/makes')
      //.subscribe(res => res.json());
  }
  getFeatures() {
    return this.http.get('/api/features')
  }

  create(vehicle): Observable<any> {
    return this.http.post('api/vehicles', vehicle)
  }
}
