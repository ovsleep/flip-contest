import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  apiEndPoint:string = 'http://localhost:3000/api/pictures/upload';
  file: File;

  constructor(private http:Http) { }

  change(event) {
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
          this.file = fileList[0];
      }
  }

  upload(){
    let formData:FormData = new FormData();
    formData.append('pic', this.file, this.file.name);
    // let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    this.http.post(`${this.apiEndPoint}`, formData)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
            data => console.log('success'),
            error => console.log(error)
        )
  }
  ngOnInit() {
  }

}
