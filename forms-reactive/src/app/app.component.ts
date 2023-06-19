import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  

  ngOnInit(): void {

    // In Javascript and Typescript, classes are special functions that are used to construct objects. When you call a class with the new keyword, it invokes the class's constructor method to create a new object. 
    // When we pass our forbiddenNames method to FormControl's validator list, FormControl has no way of knowing that the function came from an instance of "AppComponent".
    // When angular calls a validator function like forbiddenNames it doesn't call it as a method on AppComponent instance, instead it calls it as a standalone function, not attached to any object. In this situation, the value of `this` inside the function depends on the JavaScript strict mode, it's it's on, this will be undefined, it strick mode is not enabled, this will refer to the global object `window` or `gloabl`. This behavior of this in JavaScript can be quite tricky and is different from how this works in many other programming languages, where this inside a method always refers to the instance the method belongs to.
    // Because we used .bind(this), `this` inside forbiddenNames still refers to the AppComponent instance. So this.forbiddenUsernames will correctly refer to the forbiddenUsernames array.
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });
  }

  onSubmit(){
    console.log(this.signupForm)
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // {[s:string]:boolean} is the return type of the function
  // [s:string] specifices that the key names of the object will be type of string. brackets is used when you don't know the names of the key name, but you know the type of the values. s is just a placeholder.
  // boolean specifies that the values associated with these keys will be of type boolean.
  // Inside forbiddenNames in checks if the value of the control(username input) is present in the forbiddenUsernames array, if it is, the function returns an error object `{'nameIsForbidden':true}`.
  // Angular treats any non-null and non-undefined return value from a validator as a validation error. When {'nameIsForbidden': true} is returned, Angular knows that the 'username' control is invalid because of the 'nameIsForbidden' error.
  forbiddenNames(control: FormControl):{[s:string]:boolean}{
    if( this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }
}
