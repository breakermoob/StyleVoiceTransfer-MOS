import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiModelService {
  URL = "https://34.73.196.164";
  PORT = "8000";

  constructor(private http: HttpClient) {}

  trasnferOnFire(data) {
    return this.http.post(`${this.URL}:${this.PORT}/convert/`, data);
  }

  healtCheck() {
    return this.http.get(`${this.URL}:${this.PORT}`).subscribe((res) => {
      console.log(res);
      return res;
    });
  }
}
