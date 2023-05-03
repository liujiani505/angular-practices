import { Component, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  interval;
  @Output() intervalFired = new EventEmitter<number>();
  lastNumber = 0;

  constructor() { }

  ngOnInit(): void { 
  }

  onstartGame(){
    this.interval = setInterval(()=>{
      this.intervalFired.emit(this.lastNumber + 1);
      this.lastNumber++;
    } ,1000);
  }

// In JavaScript, the clearInterval() function is used to stop a timer that was set up using the setInterval() function.
// The clearInterval() function takes a single parameter, which is the ID value returned by the setInterval() function. When clearInterval() is called with this ID value, it clears the timer and stops the execution of the function.
  onPauseGame(){
    clearInterval(this.interval);
  }
}


