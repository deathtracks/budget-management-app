import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit,OnChanges {
  @Input() value: number;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.approuveValue();
  }

  ngOnInit() {
    this.approuveValue();
  }

  private approuveValue(){
    if(this.value){
      if(this.value>100){
        this.value = 100;
      } else if(this.value<0){
        this.value = 0;
      }
    } else {
      this.value =0;
    }
  }

}
