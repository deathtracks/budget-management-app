import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { addDoc, doc, DocumentReference, setDoc} from 'firebase/firestore';
import { Objectif } from 'src/app/class/base/objectif';
import { Section } from 'src/app/class/base/section';
import { UserInterface, UserObject } from 'src/app/class/base/user-object';
import { environment } from 'src/environments/environment';
import { ObjectBaseService } from '../base/object-base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ObjectBaseService<UserObject> {

  constructor() {
    super();
    this.collection = environment.collection.user;
    this.objSub = new Subject();
  }

  public getAll(): Promise<UserObject[]> {
    throw Error('This methode is prohibited');
  }

  public getCurrent(): UserObject{
    return this.obj;
  }

  public createOne(obj: UserObject): Promise<UserObject> {
    return new Promise<UserObject>((resolve,reject)=>{
      setDoc(doc(this.db,this.collection,obj.email),this.convertData(obj))
      .then(()=>{
        this.obj = obj;
        this.publish();
        resolve(this.obj);
      })
      .catch(err => reject(err));
    })
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

  public changeEmail(u: UserObject, e: string): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      const prevEmail = u.email;
      u.setEmail(e);
      this.createOne(u)
      .then((v)=>{
        this.obj = v;
        this.publish();
        resolve(true);
      })
      .catch(err=>rejects(err));
    })
  }

  protected convertToObj(id: string, data: UserInterface): UserObject {
    const sectionList = [];
    if(data.section && data.section.length>0){
      data.section.forEach(s=>sectionList.push(new Section(s.part,s.name)));
    }
    const objectifList = [];
    if(data.objectifs && data.objectifs.length>0){
      data.objectifs.forEach(o=>{
        const s = [];
        o.dates.forEach(d=>s.push(d.toDate()))
        objectifList.push(
          new Objectif(
            o.name,
            o.start.toDate(),
            o.amount,
            o.completed,
            o.saves,
            s
          )
        )
      });
    }
    return new UserObject(
      data.email,
      data.name,
      sectionList,
      objectifList,
      data.month
    );
  }
  public publish(): void {
    if(this.obj===null){
      console.log('voided the user');
    }
    this.objSub.next(this.obj);
  }
}
