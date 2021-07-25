/* eslint-disable @typescript-eslint/naming-convention */
import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation/translation.service';

@Pipe({
  name: 'dateToString'
})
export class DatePipe implements PipeTransform {


  private month = {
    en:[
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    fr:[
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ]
  };
  private dayOfWeek = {
    en:['Monday','Tueday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    fr:['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']
  };

  constructor(
    private translation: TranslationService
  ){}

  transform(value: Date, ...args: unknown[]): string {
    const currentLang = this.translation.getCurrentLanguage();
    const dayOfWeek = value.getDay();
    const dateOfMonth = value.getDate();
    const month = value.getMonth();
    const year = value.getFullYear();
    let res= '';
    if(args.includes('full-str')){
      res = `${this.dayOfWeek[currentLang][dayOfWeek]} ${dateOfMonth} ${this.month[currentLang][month]} ${year}`;
    }else if(args.includes('full')){
      if(dateOfMonth<10){
        res+=`0${dateOfMonth}`;
      }else {
        res+=`${dateOfMonth}`;
      }
      res+='/';
      if(month+1<10){
        res+=`0${month+1}`;
      }else{
        res+=`${month}`;
      }
      res+=`/${year}`;
    }else if(args.includes('short-str')){
      res = `${this.dayOfWeek[currentLang][dayOfWeek]} ${dateOfMonth} ${this.month[currentLang][month]}`;
    }
    return res;
  }

}
