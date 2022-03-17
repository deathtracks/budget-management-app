import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference } from 'firebase/firestore';
import { DocumentSnapshot, Firestore, getDoc, getDocs, getFirestore} from 'firebase/firestore';
import { query, Query, QuerySnapshot, Timestamp, updateDoc } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { ObjectBasePrototype } from '../../class/object-base-prototype';

@Injectable({
  providedIn: 'root'
})
/**
 * The base class for every object in this project.
 *
 * @public
 */
export abstract class ObjectBaseService<T extends ObjectBasePrototype> {
  public objSub: Subject<T>;
  public objListSub: Subject<T[]>;
  /**
   * Used to store and access to the Firestore object
   */
  protected db: Firestore;
  /**
   * The collection the Object used to store entry.
   * Must be set in the constructor.
   */
  protected collection: string;
  protected obj: T;
  protected objList: T[];

  constructor() {
    this.db = getFirestore();
  }

  /**
   * Get all entry of the collection specified in the constructor
   *
   * @returns Returns all the entry as T objects
   */
  public getAll(): Promise<T[]> {
    const queryRef = query(collection(this.db,this.collection));
    return new Promise<T[]>((resolve,reject)=>{
      this.executeQuery(queryRef) //Execute the query stored in the queryRef object
      .then((querySnap: QuerySnapshot)=>{
        const v: T[] = []; //temporal array to store objects that will be retun
        querySnap.forEach((d: DocumentData) =>{ //Convert data to object for every entry
          const data = d.data();
          v.push(this.convertToObj(d.id,data));
        });
        this.objList = v;
        this.publish();
        resolve(v); //Solve the promise and return the array of object
      })
      .catch(err => reject(err));
    });
  }

  /**
   * Get the entry corresponding to the id
   *
   * @param id - unique key found in the firestore database
   * @returns the entry as a T object corresponding to the id, if it exist
   */
  public getOne(id: string): Promise<T> {
    const docRef = doc(this.db,this.collection,id);
    return new Promise<T>((resolve,reject)=>{
      getDoc(docRef)
      .then((docSnap: DocumentSnapshot)=>{
        const o = this.convertToObj(docSnap.id,docSnap.data());
        this.obj = o;
        this.publish();
        resolve(o); //Convert data to object
      })
      .catch(err => reject(err));
    });
  }

  /**
   * Delete the entry corresponding to the id
   *
   * @param id unique key found in the firestore database
   * @returns true if it worked
   */
  public deleteOne(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve,reject)=>{
      deleteDoc(doc(this.db,this.collection,id))
      .then(()=>{
        this.obj = null;
        this.publish();
        resolve(true);
      })
      .catch(err=>reject(err));
    });
  }

  /**
   * Create an entry corresponding to the object and return the object with is id.
   *
   * @remarks
   * The Firestore database handle the id generation.
   * @param obj - instance of T
   * @returns the object given in param, but with is id setted
   */
  public createOne(obj: T): Promise<T> {
    return new Promise<T>((resolve,reject)=>{
      addDoc(collection(this.db,this.collection),this.convertData(obj)) //Create the document in the collection
      .then((docRef: DocumentReference)=>{
        this.obj = this.convertToObj(docRef.id,obj); //Convert the data return and erase the old version to access the id
        this.publish();
        resolve(this.obj);
      })
      .catch(err => reject(err));
    });
  }

  /**
   * Allow for edition of data. Works the same way as the createOne,
   * But use the stored id of the object to access it.
   *
   * @param obj
   * @returns the obj
   */
  public editOne(obj: T): Promise<T> {
    return new Promise<T>((resolve,reject)=>{
      updateDoc(doc(this.db,this.collection,obj.getId()),this.convertData(obj)) //update data corresponding to the id
      .then(()=>{
        this.obj = obj;
        this.publish();
        resolve(obj);
      })
      .catch(err=>reject(err));
    });
  }

  /**
   * Allows for cleaner code
   *
   * @param queryRef
   * @returns querySnapshot defined by the Firestore
   */
  protected executeQuery(queryRef: Query<DocumentData>): Promise<QuerySnapshot> {
    return new Promise<QuerySnapshot>((resolve, reject) => {
      getDocs(queryRef)
        .then((querySnapshot: QuerySnapshot) => {
          resolve(querySnapshot);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Convert the object into data and take care to match firestore standard
   *
   * @param obj
   * @returns
   */
  protected convertData(obj: T): any{
    const data = obj.getObject();
    //Checks if the data from the object contains any data and convert them to the Firebase standard
    //See firebase documentation for more info
    if(Object.keys(data).includes('date')){
      data.date = Timestamp.fromDate(data.date);
    }
    //Checks for data not defined by the object and convert them to null to match Firebase standard
    //See firebase documentation for more info
    for(const k of Object.keys(data)){
      if(data[k]===undefined){
        data[k]=null;
      }
    }
    return data;
  }

  /**
   * Must be definied for all implementation of the ObjectBaseService
   *
   * @param id - unique identifier given by the firestore
   * @param data - data retrived from the firestore corresponding to the id
   */
  protected abstract convertToObj(id: string, data: any): T;

  protected abstract publish(): void;

}
