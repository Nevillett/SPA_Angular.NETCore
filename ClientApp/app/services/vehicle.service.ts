import { SaveVehicle } from './../models/vehicle';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
// {
//   providedIn: 'root'
// })
export class VehicleService {
  private readonly vehicleEndpoint = '/api/vehicles';
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

  delete(id) {
    return this.http.delete('api/vehicles/' + id)
  }

  //getVehicles() {
  //  return this.http.get('api/vehicles')
  //}

  getVehicles(filter) {
    return this.http.get(this.vehicleEndpoint + '?' + this.toQueryString(filter))
  }

  toQueryString(obj) {
    // encodeURIComponent(); api configure like api/vehicles/?makeId=1
    var parts : Array<any> = [];
    for (var property in obj) {
      var value = obj[property]; //obj.proterty
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value)); 
    }
    return parts.join('&');
  }
}
