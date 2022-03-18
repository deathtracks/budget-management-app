import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Objectif } from 'src/app/class/base/objectif';
import { Section } from 'src/app/class/base/section';
import { User } from 'src/app/class/base/user';
import { environment } from 'src/environments/environment';
import { ObjectBaseService } from '../base/object-base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ObjectBaseService<User> {

  constructor() {
    super();
    this.collection = environment.collection.user;
    this.objSub = new Subject();
  }

  public addObjectif(o: Objectif): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      this.obj.objectifs.push(o);
      this.editOne(this.obj)
      .then(()=>resolve(true))
      .catch((err)=>rejects(err));
    });
  }

  public removeObjectif(index: number): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      this.obj.objectifs.splice(index,1);
      this.editOne(this.obj)
      .then(()=>resolve(true))
      .catch((err)=>rejects(err));
    });
  }

  public editObjectif(o: Objectif, index: number): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      this.obj.objectifs[index] = o;
      this.editOne(this.obj)
      .then(()=>resolve(true))
      .catch((err)=>rejects(err));
    });
  }

  public addMonth(monthId: string): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      this.obj.months.push(monthId);
      this.editOne(this.obj)
      .then(()=>resolve(true))
      .catch((err)=>rejects(err));
    });
  }

  public removeMonth(monthId: string): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      const index = this.obj.months.findIndex((v,i,list)=>v===monthId);
      if (index){
        this.obj.months.splice(index,1);
        this.editOne(this.obj)
        .then(()=>resolve(true))
        .catch((err)=>rejects(err));
      } else {
        resolve(true);
      }
    });
  }

  public addSection(s: Section): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      this.obj.sections.push(s);
      this.editOne(this.obj)
      .then(()=>resolve(true))
      .catch((err)=>rejects(err));
    });
  }

  public removeSection(index: number): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      this.obj.sections.splice(index,1);
      this.editOne(this.obj)
      .then(()=>resolve(true))
      .catch((err)=>rejects(err));
    });
  }

  public editSection(s: Section, index: number): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      this.obj.sections[index]= s;
      this.editOne(this.obj)
      .then(()=>resolve(true))
      .catch((err)=>rejects(err));
    });
  }

  protected convertToObj(id: string, data: any): User {
    const sectionList = [];
    if(data.section && data.section.length>0){
      data.section.forEach(s=>sectionList.push(new Section(s.part,s.name)));
    }
    const objectifList = [];
    if(data.objectifs && data.objectifs.length>0){
      data.objectifs.forEach(o=>objectifList.push(new Objectif(
        o.name,
        o.start,
        o.amount,
        o.completed,
        o.save,
        o.date
      )));
    }
    return new User(
      data.email,
      data.firstName,
      data.lastName,
      sectionList,
      objectifList,
      data.month
    );
  }
  protected publish(): void {
    throw new Error('Method not implemented.');
  }
}
