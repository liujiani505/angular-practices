import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    //This code below is using the snapshot method of ActivatedRoute to grab the route parameters as soon as the component is instantiated. This works fine if you know the parameters are never going to change while the component is active. If you delete this part, and the component is instantiated without the params (id and name) already being available, then the user property would not be defined until the params are updated and the subscription callback is run.
    this.user = {
      id: this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name'],
    }

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          // params is an object to access it's id property we can use brackets
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
