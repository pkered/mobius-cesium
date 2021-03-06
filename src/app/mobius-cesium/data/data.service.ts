import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import * as chroma from "chroma-js";

@Injectable()
export class DataService {
  private _jsonModel: JSON;
  private subject = new Subject<any>();
  ColorValue:string;
  HeightValue:string;
  CheckHide:boolean;
  CheckOpp:boolean=false;
  CheckCom:boolean;
  CheckOcc:boolean;
  viewer:any;
  SelectedEntity:any;
  cesiumpromise:any;
  propertyNames:Array<any>;
  HeightKey:Array<any>;
  selectEntity:object;
  Colortexts:Array<any>;
  MinColor:number;
  MaxColor:number;
  MinHeight:number;
  MaxHeight:number;
  ScaleValue:number=1;
  PuScaleValue:number;
  CheckScale:boolean=true;
  CheckExtrude:boolean=false;
  hideElementArr:Array<any>;
  HideNum:Array<any>;
  poly_center:Array<any>;
  ChromaScale:any;
  ceisumData:Array<any>;
  InitialTool:boolean;
  InitialPub:boolean;
  mode:string;
  CheckInvert:boolean=false;
  ViData:object;
  PuData:object;


  sendMessage(message?: string) {
    this.subject.next({text: message});
  }
 
  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() {
    this.ChromaScale=chroma.scale("SPECTRAL");
  }

  getGsModel(): any{
    return this._jsonModel; 
  }
  setMode(mode:string){
    this.mode=mode;
  }

  setGsModel(model: JSON){
    this._jsonModel = model;

    if(this._jsonModel===undefined){
      var viewer = new Cesium.Viewer(document.createElement("div"));
    }
    else{
      try{
        /*this.propertyNames = Object.keys(model["features"][0].properties);
        this.ColorValue = this.propertyNames[0];
        this.propertyNames.sort()
        this.propertyNames.unshift("None");


        let feature_instance = model["features"][0];
        this.HeightKey = this.propertyNames.filter(function(prop_name){
            let value =  feature_instance.properties[prop_name];
            return (typeof(value) === 'number');
        });
        this.HeightValue = this.HeightKey[0];
        this.HeightKey.sort()
        this.HeightKey.unshift("None");*/


        // console.log(this.propertyNames);
        // this.HeightKey = this.propertyNames.filter(function(prop_name){
        //   console.log(prop_name);
        //   let value =  feature_instance.properties[prop_name];
        //   console.log(value);
        //   return (typeof(value) === 'number');
        // });
        // console.log(this.HeightKey);
      }
      catch(ex){
        console.log("property names errored");
      }
    }

    this.sendMessage("model_update");
  }

  getValue(model: JSON){
    this.propertyNames = Object.keys(model["features"][0].properties);
    this.ColorValue = this.propertyNames[0];
    this.propertyNames.sort()
    this.propertyNames.unshift("None");


    let feature_instance = model["features"][0];
    this.HeightKey = this.propertyNames.filter(function(prop_name){
        let value =  feature_instance.properties[prop_name];
        return (typeof(value) === 'number');
    });
    this.HeightValue = this.HeightKey[0];
    this.HeightKey.sort()
    this.HeightKey.unshift("None");

  }
  LoadJSONData(){
    var cesiumData=this._jsonModel["cesium"];
    var data:any=[];
    this.ceisumData=[];
    this.propertyNames=[];
    this.HeightKey=[];
    if(cesiumData["colour"]!==undefined&&cesiumData["colour"]["attribs"]!==undefined){
      for(var i=0;i<cesiumData["colour"]["attribs"].length;i++){
        this.propertyNames.push(cesiumData["colour"]["attribs"][i]["name"]);
      }
      this.ColorValue=this.propertyNames[0];
    }
    if(cesiumData["extrude"]!==undefined&&cesiumData["extrude"]["attribs"]!==undefined){
      for(var i=0;i<cesiumData["extrude"]["attribs"].length;i++){
        this.HeightKey.push(cesiumData["extrude"]["attribs"][i]["name"]);
      }
      this.HeightValue=this.HeightKey[0];
      this.PuScaleValue=undefined;
      /*let self=this;
      setTimeout(function(){
        self.onChangeHeight(self.HeightKey[0]);
      },3000)*/
    }

  }

  getPropertyNames(){
    return this.propertyNames;
  }

  getColorValue(ColorValue):void{
    this.ColorValue=ColorValue;
  }
  getHeightValue(HeightValue):void{
    this.HeightValue=HeightValue;
  }

  getViData(ColorProperty:Array<any>,ColorMin:number,ColorMax:number,
            ExtrudeProperty:Array<any>,ExtrudeMin:number,ExtrudeMax:number,
            Scale:number,Invert:boolean,HeightChart:boolean,Filter:Array<any>){
    this.ViData={ColorProperty:ColorProperty,ColorMin:ColorMin,ColorMax:ColorMax,
                 ExtrudeProperty:ExtrudeProperty,ExtrudeMin:ExtrudeMin,ExtrudeMax:ExtrudeMax,
                 Scale:Scale,Invert:Invert,HeightChart:HeightChart,Filter:Filter}
  }
  getPuData(ColorProperty:Array<any>,ColorMin:number,ColorMax:number,ColorInvert:boolean,
            ExtrudeProperty:Array<any>,ExtrudeMin:number,ExtrudeMax:number,
            Scale:number,Invert:boolean,HeightChart:boolean,Filter:Array<any>){
    this.PuData={ColorProperty:ColorProperty,ColorMin:ColorMin,ColorMax:ColorMax,ColorInvert:ColorInvert,
                 ExtrudeProperty:ExtrudeProperty,ExtrudeMin:ExtrudeMin,ExtrudeMax:ExtrudeMax,
                 Scale:Scale,Invert:Invert,HeightChart:HeightChart,Filter:Filter}
  }

}
