import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Expense } from 'src/app/class/base/expense';

@Component({
  selector: 'app-expense-el',
  templateUrl: './expense-el.component.html',
  styleUrls: ['./expense-el.component.scss'],
})
export class ExpenseElComponent {
  @Input() e: Expense;
  @Input() sectionName: string;
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onDelete: EventEmitter<boolean> = new EventEmitter<boolean>();
  mouse: { x: number; y: number; };
  mouseClick: { x: number; y: number; };

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    this.mouse = {
      x: event.clientX,
      y: event.clientY
    }
  };

  @HostListener('window:mousedown',['$event'])
  onMouseDown(event: MouseEvent){
    this.mouseClick = {
      x: event.clientX,
      y: event.clientY
    }
  }

  constructor() { }

  
  public editBtn(){
    this.onEdit.emit(true);
  }

  public deleteBtn(){
    this.onDelete.emit(true);
  }

  public onDragStart(e: any){
    console.log(e);
  }

  public onDragMove(e: any){
    console.log(e);
  }

}