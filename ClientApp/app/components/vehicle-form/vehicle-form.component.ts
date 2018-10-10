import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any;
  models: any;
  features: any;
  vehicle: any = {
    features: [],
    contact: {}
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService ) { 
      this.route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      });
    }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicle.id)
    .subscribe(
      v => {
        this.vehicle = v.json();
      }, err => {
        if (err.status == 404)
          this.router.navigate(['/home']);
      });

    this.vehicleService.getMakes().subscribe(makes =>
      this.makes = makes.json());

    this.vehicleService.getFeatures().subscribe(features =>
      this.features = features.json());
  }

  onMakeChange(){
    var selectedMake = this.makes.find((m: any) => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }
  
  OnFeatureToggle(featureId, $event){
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle)
      .subscribe(
        x => console.log(x.json()));
  }
}