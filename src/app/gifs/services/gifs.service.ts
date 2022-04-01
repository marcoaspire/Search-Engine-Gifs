import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interfaces/gif.intereface';
//service angular works as a singleton
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _history:string[] =[];
  private apiKey="6fcnBm15wvGBVcXiFgD1QUQI1ov6hVbh";
  private endpoint ="https://api.giphy.com/v1/gifs";
  //TODO: change to the correct type
  public results:Gif[]=[];

  get history2(){
    return [...this._history];
  }

  constructor(private http:HttpClient){
    //loads history from localStorage

    this._history = JSON.parse(localStorage.getItem("history")!) || [];
    this.results = JSON.parse(localStorage.getItem("lastResult")!) || '';

    // if (localStorage.getItem("history"))
    // {
    //   this._history= JSON.parse(localStorage.getItem("history")!);

    // }

  }

  searchGifs(query:string = ''){

    //TODO: Check version lib' compiler option to 'es2016' or later.
    query=query.toUpperCase();
    if (!this._history.includes(query))
    {
      this._history.unshift(query);
      //just last 10 elements
      this._history=this._history.splice(0,10);
    }
    /*
   
      this._history.unshift(query.toUpperCase());
      //just last 10 elements
      this._history=this._history.splice(0,10);
*/
      localStorage.setItem("history",JSON.stringify( this._history));

      const params = new HttpParams().set('api_key', this.apiKey).set('limit','10').set('q',query);
      
      

      this.http.get(`${this.endpoint}/search?`,{ params})
      .subscribe( (resp:any) => {
        this.results=resp.data;
        localStorage.setItem("lastResult",JSON.stringify(this.results));

      })
    
  }
}
