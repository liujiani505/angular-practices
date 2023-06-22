import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";


export class CustomValidators {
    // static method can be accessed without having to instantiate our own class
    static invalidProjectName(control: FormControl) :{[s:string]:boolean}{
       if(control.value === 'Test'){
        return {'invalidProjectName': true}
       }
       return null;
    }

    // ASYNC VALIDATOR
    static asyncInvalidProject(control: FormControl): Promise<any> | Observable<any>{
        const promise = new Promise(
            (resolove, reject) => {
                setTimeout(()=>{
                    if(control.value === 'Testproject'){
                        resolove({'invalidProjectName': true});
                    } else {
                        resolove(null);
                    }
                },2000);
            }
        )
        return promise;
    }
}