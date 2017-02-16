import { Component, OnInit } from '@angular/core';
import { FlipperService } from '../flipper.service'
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent implements OnInit {
  apiImgSrc:string = 'http://localhost:3000/pics/'
  file: File;
  originalName: string;
  flippedName: string;
  originalSrc: string;
  flippedSrc: string;
  downExt: string = 'jpg';

  constructor(private flipperService:FlipperService) { }

  change(event) {
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
          this.file = fileList[0];
      }
  }

  upload(){
    this.flipperService.upload(this.file).then(
      (data) => {
        this.originalName = data.originalName;
        this.flippedName = data.flippedName;
        this.originalSrc = this.apiImgSrc + data.originalName;
        this.flippedSrc = this.apiImgSrc + data.flippedName;
    })
  }

  // download(){
  //   this.flipperService.download(this.flippedName, 'jpg').subscribe(
  //     (res) => {
  //       FileSaver.saveAs(res, 'test.jpg');
  //   });
  // }

  download(){
    this.flipperService.download(this.flippedName, this.downExt).then(
      (data) => {
        FileSaver.saveAs(data, `${this.file.name.substring(0, this.file.name.indexOf('.'))}.${this.downExt}`);
    });
  }

  ngOnInit() {
  }

}
