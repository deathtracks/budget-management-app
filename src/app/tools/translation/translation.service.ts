import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserInfoService } from 'src/app/services/data/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public translation = new Subject<number>();
  public languages = ['English','Français'];

  private data: any;
  private language = 'en';
  private knownLanguage = ['en','fr'];
  constructor(
    private http: HttpClient
  ) {
    this.readFile();
   }

  public switchTo(newLanguage: number){
      this.language = this.knownLanguage[newLanguage];
      this.readFile();
  }

  public updateTranslation(){
    this.translation.next(this.knownLanguage.indexOf(this.language));
  }

  public getCurrentLanguage(){
    return this.language;
  }


  public getText(id: string): string{
    if(this.data){
      if(this.data.text[id]){
        return this.data.text[id];
      }else{
        throw new Error(`This text [id=${id}] is not referenced in the source file`);
      }
    }
  }

  private readFile(){
    this.http.get(`../../../assets/translation/${this.language}.json`)
    .subscribe(data =>{
      this.data = data;
      this.updateTranslation();
    });
  }
}
