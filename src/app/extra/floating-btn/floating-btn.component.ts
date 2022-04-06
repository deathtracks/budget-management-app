import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

export interface Description{
  name: string,
  icon: string
}

@Component({
  selector: 'app-floating-btn',
  templateUrl: './floating-btn.component.html',
  styleUrls: ['./floating-btn.component.scss'],
})
export class FloatingBtnComponent implements OnInit {
  @Input() buttons : Description[]
  @Output() btnTrigger: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('main') btn;
  // private btnMain: HTMLButtonElement;
  private btnElements;
  private menuDisplay: boolean = false;

  constructor() { }

  ngOnInit() {
    // this.btnMain = document.getElementById('main-btn') as HTMLButtonElement;
    this.btnElements = document.getElementsByClassName('second');
  }

  showBtn(){
    this.menuDisplay = !this.menuDisplay;
    this.btnElements = Array.from(this.btnElements);
    // console.log(this.btn);
    // console.log(this.btnMain);
    if(this.menuDisplay){
      // this.btnMain.classList.add('rotate');
      this.btn.nativeElement.classList.add('rotate');
      this.btnElements.forEach((e,i)=> e.classList.add(`raise`));
    } else {
      // this.btnMain.classList.remove('rotate');
      this.btn.nativeElement.classList.remove('rotate');
      this.btnElements.forEach((e,i)=> e.classList.remove(`raise`));
    }
  }

  onAction(index: number){
    this.btnTrigger.emit(this.buttons[index].name);
  }

}
