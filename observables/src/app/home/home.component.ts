import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable, observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe( count => {
    //   console.log(count);
    // })
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 2){
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error('Count is greater than 3!'))
        }
        count++;
      }, 1000)
    })

    // pipe is used to chain multiple operators together, this enables you to create a pipeline of operators that process the emitted values from the observable and produce the desired output.

    this.firstObsSubscription = customIntervalObservable.pipe(
      filter(data => {
        return data > 0;
      }),
      map((data: number)=>{
        return 'Round:' + (data + 1);
      }))
      .subscribe(data => {
        console.log(data);
      }, error => {
        alert(error.message);
      }, () => {
        console.log('Completed!');
      })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
