import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

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
}
