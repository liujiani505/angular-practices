import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  // @ViewChild('username') userName: NgModel;
  @ViewChild('username') userName: ElementRef;
  defaultQuestion = 'pet';
  defaultUsername = 'Jiani';
  answer = '';
  genders = ['male', 'female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'teacher',
    //   questionAnswer: '',
    //   gender: 'male'
    // })

        // this can help you only overwrite certain field/fields in the form.
        this.signupForm.form.patchValue({
          userData:{
            username: suggestedName,
          }
        })

    // these are trying different approaches by using @viewchild to just the username input   
    // this.userName.control.setValue(suggestedName);
    // this.userName.nativeElement.value = suggestedName;
  }
  // onSubmit(form: NgForm){
  //   console.log(form)
  // }
    onSubmit(){
    console.log(this.signupForm)
  }
}
