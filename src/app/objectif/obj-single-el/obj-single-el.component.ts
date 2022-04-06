import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Objectif } from 'src/app/class/base/objectif';

@Component({
  selector: 'app-obj-single-el',
  templateUrl: './obj-single-el.component.html',
  styleUrls: ['./obj-single-el.component.scss'],
})
export class ObjSingleElComponent implements AfterViewChecked {
  @Input() o: Objectif;
  @Input() index: number;
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onDelete: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private gestureCtrl: GestureController
  ) { }

  ngAfterViewChecked(): void {
    const element = document.getElementById(`page-content-${this.o.name}`);
    const elementWidth = element.clientWidth;
    // console.log(element);
    const g = this.gestureCtrl.create({
      el : element,
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
      },
    },true)
    g.enable();
  }

  public editBtn(){
    this.onEdit.emit(true);
  }

  public deleteBtn(){
    this.onDelete.emit(true);
  }

}
