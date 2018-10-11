import { SaveVehicle, Vehicle } from './../../models/vehicle';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any;
  models: any;
  features: any;
  vehicle: SaveVehicle = {
    id: 0,
    modelId: 0,
    makeId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      phone: '',
      email:''
    }
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
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id))
    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0].json();
      this.features = data[1].json();

      if (this.vehicle.id)
        this.setVehicle(data[2].json());
        this.populateModels();
    }, err => {
      if (err.status == 404)
          this.router.navigate(['/home']);
    });  
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    v.features.forEach(f =>  {this.vehicle.features.push(f.id)});
    // this.vehicle.features = 
  }

  private populateModels() {
    var selectedMake = this.makes.find((m: any) => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onMakeChange(){
    this.populateModels();
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
    if (this.vehicle.id) {
      this.vehicleService.updateVehicle(this.vehicle)
        .subscribe(x => {
          console.log(x.json());
          this.toastyService.success({
            title: 'Success',
            msg: 'The vehicle was successfully updated.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        });
    } else {
      delete this.vehicle.id;// otherwise id is null
        this.vehicleService.create(this.vehicle)
        .subscribe(
          x => console.log(x.json()));
    }
  }

  delete() {
    if (confirm("are you sure? ")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe( x => {
          this.router.navigate(['/home']);
        })
    }
  }
}