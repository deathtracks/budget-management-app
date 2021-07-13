import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateToStringService {

  constructor() { }

  public dateStr(date: Date): string{
    let res = `${date.getFullYear()}-`;
    if(date.getMonth()+1<10){
      res+=`0${date.getMonth()+1}`;
    }else{
      res+=`${date.getMonth()}`;
    }
    res+='-';
    if(date.getDate()<10){
      res+=`0${date.getDate()}`;
    }else{
      res+=`${date.getDate()}`;
    }
    console.log(res);
    return res;
  }
}
