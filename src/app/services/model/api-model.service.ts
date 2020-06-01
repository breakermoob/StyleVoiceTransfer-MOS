import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiModelService {

  URL = 'http://35.185.67.85:8000';


  constructor(private http: HttpClient) { }

  trasnferOnFire(data) {
    // const config = { headers: new HttpHeaders().set('Accept', 'multipart/form-data') };
    // return this.http.post(`${this.URL}/convert/`, data, config)
    //   .subscribe(res => {
    //     console.log(res)
    //     return res;
    //   });

    this.http.post(this.URL + '/convert/', data).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    // .pipe(map(res => {
    //   //Procesar la respuesta 
    //   console.log(res)
    //   return res;
    // }));
  }

  healtCheck() {
    return this.http.get(this.URL)
      .subscribe(res => {
        console.log(res)
        return res;
      });
  }
}
