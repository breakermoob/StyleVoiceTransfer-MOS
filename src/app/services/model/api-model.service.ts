import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiModelService {

  URL = 'http://35.231.122.36:8000';


  constructor(private http: HttpClient) { }

  trasnferOnFire(data) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(`${this.URL}/convert/`, data)
      .pipe(map(res => {
        //Procesar la respuesta 
        console.log(res)
        return res;
      }));
  }

  healtCheck() {
    return this.http.get(this.URL)
      .subscribe(res => {
        console.log(res)
        return res;
      });
  }
}
