import { SaveVehicle } from './../models/vehicle';
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

  getVehicle(id) {
    return this.http.get('api/vehicles/' + id)
  }

  updateVehicle(vehicle: SaveVehicle): Observable<any> {
    return this.http.put('api/vehicles/' + vehicle.id, vehicle)
  }
}
