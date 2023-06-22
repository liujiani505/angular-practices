import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  // NOTE: projectForm is a property of class AppComponent, and in angular, class properties are not typically declared with let or const, these are ususally used for variables within methods, and not for properties of the class. 

  projectForm: FormGroup

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidProjectName], CustomValidators.asyncInvalidProject),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical'), 
    })
  }

  onSaveProject(){
    console.log(this.projectForm.value)
  }

  
}
