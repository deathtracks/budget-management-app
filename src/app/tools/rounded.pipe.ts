import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rounded'
})
export class RoundedPipe implements PipeTransform {

  transform(value: number, ...args: number[]): string {
    if(!args[0]){
      args[0]=2;
    }
    const res = `${value}`;
    const dotIndex = res.indexOf('.');
    console.log(dotIndex);
    if(dotIndex>0){
      return res.slice(0,dotIndex+args[0]+1);
    }else{
      return res;
    }
  }

}
