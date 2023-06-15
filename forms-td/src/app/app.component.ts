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
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender:''
  }
  submitted: boolean = false;

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
    // one note: you have to call this line of code after the "ngAfterViewInit" lifecycle hook, because @ViewChild isn't available until after Angular has finished initializing the component's view.
    // this.userName.control.setValue(suggestedName);
    // this.userName.nativeElement.value = suggestedName;
  }
  // onSubmit(form: NgForm){
  //   console.log(form)
  // }
    onSubmit(){
      console.log(this.signupForm)
      this.submitted = true;
      // here we're accessing the value of the username field from the form values and assigning it to "this.user.username". This is a read operation. We're simply reading the current value of the username field from the form and setting that value to the username property of your user object. On the other hand, this.signupForm.value = "" won't work, because we're tyring to assign a new value, which is not allowed. This is write operation. The value property of NgForm is read-only.Its purpose is to provide you with the current state of the form. It doesn't allow you to directly set the values of the form fields. The correct to set form values is by using setValue method..
      this.user.username = this.signupForm.value.userData.username;
      this.user.email = this.signupForm.value.userData.email;
      this.user.secretQuestion = this.signupForm.value.secret;
      this.user.answer = this.signupForm.value.questionAnswer;
      this.user.gender = this.signupForm.value.gender;
  }
}
