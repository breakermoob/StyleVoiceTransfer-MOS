import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
