import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMosService {

  URL = 'http://integrador-vst-survey-backend.herokuapp.com/api/v1';

  constructor(private http: HttpClient) { }

  getSurvey(): Observable<any[]> {
    return this.http.get(`${this.URL}/survey/random?n=18`)
      .pipe(map(res => {
        let scripts: any = res;
        console.log(scripts)
        return scripts;
      }));
  }
  saveSurvey(data: any) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(`${this.URL}/score`, data, config)
      .pipe(map(res => {
        //Procesar la respuesta 
        return res;
      }));
  }
}
