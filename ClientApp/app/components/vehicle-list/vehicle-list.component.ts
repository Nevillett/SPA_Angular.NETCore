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
  allVehicles: Vehicle[] =[];
  makes: KeyValuePair[] = [];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(data => this.makes = data.json());

    this.vehicleService.getVehicles()
      .subscribe(data => this.vehicles = this.allVehicles = data.json())
  }

  OnFilterChange() {
    var vehicles = this.allVehicles;

    if(this.filter.makeId)
      vehicles = vehicles.filter( v => v.make.id == this.filter.makeId);
    
    this.vehicles = vehicles;
  }

  resetFilter() {
    this.filter = {}
    this.OnFilterChange();
  }
}
