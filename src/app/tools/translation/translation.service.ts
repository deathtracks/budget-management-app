import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private data: string;
  constructor(
    private http: HttpClient
  ) {
    this.readFile();
   }

  private readFile(){
    this.http.get('../../../assets/translation/en.json')
    .subscribe(data =>{
      console.log(data);
    });
  }
}
