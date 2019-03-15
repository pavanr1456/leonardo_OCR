import { Component, OnInit } from '@angular/core';
import { OcrService } from './ocr.service';
declare var $: any;
@Component({
  selector: 'app-ocr',
  templateUrl: 'ocr.component.html',
  styleUrls: [ 'ocr.component.scss' ],
  providers: [OcrService]
})
export class OcrComponent implements OnInit {
  result: any;
  content: string;
  fileName: string;
  uploadInput: any ;
  constructor(private ocrService: OcrService) {}

  ngOnInit() {}

  onUpload() {
    this.uploadInput = document.querySelector('#file-browse-input');
    this.uploadInput.click();
  }

  readFile(evnt) {
    const fileReader = new FileReader();
    fileReader.onloadend = e => {
      if (fileReader.readyState === 2) {
        this.content = fileReader.result.toString();
      }
    };
    fileReader.readAsText(this.uploadInput.files[0]);
    // fileReader.readAsBinaryString(this.uploadInput.files[0]);
    this.fileName = this.uploadInput.files[0].name;
  }

  runOCR() {
    if (this.fileName) {
      this.result = `Loading ...`;
      this.ocrService.getOcr(this.fileName, this.uploadInput.files[0]).subscribe(
        res => {
          this.result = res.predictions;
        },
        err => {
          this.result = err.message;
        }
      );
       } else {
          this.result = `File not found`;
      }
  }
}
