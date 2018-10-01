import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
// {
//   providedIn: 'root'
// })
export class MakeService {

  constructor(private http : Http) { }

  getMakes() {
    return this.http.get('/api/makes')
      //.subscribe(res => res.json());
  }
}
