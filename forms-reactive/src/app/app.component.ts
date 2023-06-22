import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value)=> {
    //     console.log(value)
    //   }
    // )
    this.signupForm.statusChanges.subscribe(
      (status)=> {
        console.log(status)
      }
    )


    // SETTING AND PATCHING VALUES
    this.signupForm.setValue({
      'userData':{
        'username': 'Jiani',
        'email': 'jiani@test.com'
      },
      'gender': 'female',
      'hobbies': []
    })
    this.signupForm.patchValue({
      'userData':{
        'username': 'Anna',
      }
    })
  }

  onSubmit(){
    console.log(this.signupForm)
    this.signupForm.reset();
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
  // The decision to return an object from a validator instead of other types is by design in Angular.
  forbiddenNames(control: FormControl):{[s:string]:boolean}{
    if( this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }


  // Asynchronous validators can return either a Promise or an Observable. They both serve similar purposes and can be used to handle async operations, but they work a bit differently:

  //A Promise is an object representing the eventual completion or failure of an asynchronous operation. It is a one-time operation that either succeeds or fails.

  //An Observable, part of the RxJS library, is more powerful. It is a stream of events over time that you can subscribe to. It's not just a one-time operation; it can be cancelled, retried, and it can trigger multiple events.

  // a Promise is being used for simplicity, as it's only needed to run a single async operation. It's created to simulate a delay (1500ms) and then checks if the email equals 'test@test.com'. If it does, it resolves to { 'emailIsForbidden': true }, indicating the validation failed. If it doesn't, it resolves to null, indicating validation passed.

  // This Promise is returned from the validator, and Angular subscribes to it. If it eventually resolves to an error object, Angular marks the form control as invalid, and if it resolves to null, Angular marks the form control as valid.

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
      const promise = new Promise<any>((resolve, reject) => {
        setTimeout( ()=>{
          if(control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true});
          } else {
            resolve(null);
          }
        },1500);
      });
      return promise;
  }
}


// we can replace promise with observable, we can use the `of` function from RXJS to create an observable, and pipe and delay to simulate the delay

// import { of } from 'rxjs';
// import { delay } from 'rxjs/operators';
// forbiddenEmails(control: FormControl): Observable<any> {
//   return of(control.value === 'test@test.com' ? { 'emailIsForbidden': true } : null).pipe(delay(1500));
// }


// we can also imagine that we have an API endpoint that can check if an email is already taken.
// forbiddenEmails(control: FormControl): Observable<any> {
//  return this.http.get(`https://api.example.com/user/isEmailTaken/${control.value}`).pipe(
//    map((result: boolean) => result ? { 'emailIsForbidden': true } : null),
//   catchError(() => of(null))
// );
// }







