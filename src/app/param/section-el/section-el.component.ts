import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Section } from 'src/app/class/base/section';

@Component({
  selector: 'app-section-el',
  templateUrl: './section-el.component.html',
  styleUrls: ['./section-el.component.scss'],
})
export class SectionElComponent implements OnInit,AfterViewChecked {
  @Input() s: Section

  constructor(
    private gestureCtrl : GestureController
  ) { }

  ngAfterViewChecked(): void {
    // console.log('ionViewDidEnter');
    const element = document.getElementById(`page-content-${this.s.name}`);
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

  ngOnInit() {}

  public editBtn(){

  }

  public deleteBtn(){

  }

}
