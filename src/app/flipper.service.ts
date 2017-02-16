import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FlipperService {
  apiEndPoint:string = 'http://localhost:3000/api/pictures';

  constructor(private http:Http) {

  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

  upload(file:File):Promise<any>{
    let formData:FormData = new FormData();
    formData.append('pic', file, file.name);
    return this.http.post(`${this.apiEndPoint}/upload`, formData)
        .toPromise()
        .then(response => {
            var res = response.json();
            return {originalName: res.original, flippedName: res.flipped}
        })
        .catch(this.handleError);
  }

  // download(name:string, ext:string):any{
  //   return this.http.get(`${this.apiEndPoint}/${name}/${ext}`,{responseType: ResponseContentType.Blob})
  //   .map((res) => {
  //     return new Blob([res.blob()], { type: 'image/jpg' });
  //   })
  //   .catch(this.handleError);
  // }
  download(name:string, ext:string):Promise<Blob>{
    return this.http.get(`${this.apiEndPoint}/${name}/${ext}`,{responseType: ResponseContentType.Blob})
    .toPromise()
    .then((res) => {
      return new Blob([res.blob()], { type: 'image/jpg' });
    })
    .catch(this.handleError);
  }
}
