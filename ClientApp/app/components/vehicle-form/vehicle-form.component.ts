import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any;
  models: any;
  features: any;
  vehicleMake: any;
  vehicle: any = {};

  constructor(
    private vehicleService: VehicleService ) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes =>
      this.makes = makes.json());

    // this.vehicleService.getFeatures().subscribe(features =>
    //   this.features = features.json());
  }

  onMakeChange(){
    var selectedMake = this.makes.find((m: any) => m.id == this.vehicleMake);
    this.models = selectedMake ? selectedMake.models : [];
  }

}
