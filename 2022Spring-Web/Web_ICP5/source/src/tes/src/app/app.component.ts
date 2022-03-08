import { Component } from '@angular/core';
import {interval, Subscription} from "rxjs";

export class TODO {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //setTime = 0
  eventDate = new Date("2023-01-01")
  subscribed = false
  eventTimers : Array<number> = []
  // event_date = new Date()
  // curr_date = this.event_date
  setted = false

  // subscription: Subscription
  timeupMsg = ""
  addTODOItem = ""

  todoItems : Array<any> = []


  constructor() {
  }

  ngOnInit() {
  }

  set(item: any, index: number) {

    this.timeupMsg = ""
    let event_date = new Date(item['eventDateTime'])
    let curr_date = new Date()
    let diff = event_date.getTime() - curr_date.getTime()
    let diffInSeconds = Math.floor(diff/1000)
    let days = Math.floor(diffInSeconds/(3600 * 24))
    let remainingAfterDays = diffInSeconds%(3600 * 24)
    let hours = Math.floor(remainingAfterDays/(3600))
    let remainingAfterHours = remainingAfterDays%(3600)
    let minutes = Math.floor(remainingAfterHours/(60))
    let seconds = Math.floor(remainingAfterHours%(60))
    this.setted = true

    item['days'] = days
    item['hours'] = hours
    item['minutes'] = minutes
    item['seconds'] = seconds


    let timerNumber = setInterval(() => {
      this.update(item,index)
    },1000);
    this.eventTimers.push(timerNumber)
  }

  update(item: any, index: number) {
    let days = item['days']
    let hours = item['hours']
    let minutes = item['minutes']
    let seconds = item['seconds']

    if(seconds-1 != -1) {
      seconds -= 1
    }
    else if(minutes-1 != -1){
      minutes -= 1
      seconds = 59
    }
    else if(hours-1 != -1) {
      hours -= 1
      minutes = 59
      seconds = 59
    }
    else if(days-1 != -1) {
      days -= 1
      hours = 23
      minutes = 59
      seconds = 59
    }
    else if(this.setted) {
      console.log("times up")
      this.timeupMsg = "times up"
      item['showTimeupMsg'] = true
    }
    item['days'] = days
    item['hours'] = hours
    item['minutes'] = minutes
    item['seconds'] = seconds
  }

  addItem() {

    let item = {
      description : this.addTODOItem,
      days : 0,
      hours : 0,
      minutes : 0,
      seconds : 0,
      eventDateTime : this.eventDate,
      showTimeupMsg : false
    }

    let newItemIndex = this.todoItems.length+1
    this.todoItems.push(item)
    this.addTODOItem = ""

    this.set(item,newItemIndex)
    this.update(item,newItemIndex)

  }

  delete(index: number) {
    clearInterval(this.eventTimers[index])
    this.eventTimers.splice(index,1)
    this.todoItems.splice(index,1)

  }
}
