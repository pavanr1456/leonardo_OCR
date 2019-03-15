import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class OcrService {
  readonly headers = new HttpHeaders({
    APIkey: '<YOUR API KEY>'
    // 'Content-Type': 'multipart/form-data'
  });

  constructor(private httpClient: HttpClient) {}
  getOcr(fileName: string, file: File) {
    const url = `https://sandbox.api.sap.com/ml/ocr/ocr`;
    const input = new FormData();
    input.append('files', file, fileName);
    return this.httpClient.post(url, input, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }
}
