import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-single-el',
  templateUrl: './single-el.component.html',
  styleUrls: ['./single-el.component.scss'],
})
export class SingleElComponent implements OnInit,AfterViewChecked {
  @Input() editable: boolean;
  @Input() index: string;
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onDelete: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private gestureCtrl: GestureController
  ) { }

  ngOnInit() {}

  ngAfterViewChecked(): void {
    if(this.editable){
      this.configGesture();
    }
  }

  

  public editBtn(){
    if(this.editable){
      this.onEdit.emit(true);
    }
  }

  public deleteBtn(){
    if(this.editable){
      this.onDelete.emit(true);
    }
  }

  private configGesture(){
    const element = document.getElementById(`page-content-${this.index}`);
    const elementWidth = element.clientWidth;
    const g = this.gestureCtrl.create({
      el: element,
      gestureName: '',
      onMove: (details)=>{
        if(Math.abs(details.deltaX)>elementWidth/4){
          if(details.deltaX>0){
            element.classList.remove('content-to-left');
            element.classList.add('content-to-right');
          } else {
            element.classList.remove('content-to-right');
            element.classList.add('content-to-left');
          }
        } else {
          element.classList.remove('content-to-right');
          element.classList.remove('content-to-left');
        }
      }
    },true);
    g.enable();
  }

}
