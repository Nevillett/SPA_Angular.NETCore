import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  makes: KeyValuePair[] = [];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(data => this.makes = data.json());

    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe(data => this.vehicles = data.json());
  }
  OnFilterChange() {
  // filtering on the client side
  //  var vehicles = this.allVehicles;
  //  if(this.filter.makeId)
  //    vehicles = vehicles.filter( v => v.make.id == this.filter.makeId);    
  //  this.vehicles = vehicles;

    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {}
    this.OnFilterChange();
  }
}
