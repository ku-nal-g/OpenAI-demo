import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit {

  documentList: any = [];
  pdfSelected: any = [];
  pdfBlobUrl: any;

  public document = 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf';
  public resource: string = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";

  constructor(private _httpService: HttpService, private spinner: NgxSpinnerService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.spinner.show();
    this._httpService.getDocumentList("https://custom-qatar-backend-service.azurewebsites.net/list-files/").subscribe(({
      next: (res) => {
        this.documentList = res['file list'];
        console.log(this.documentList);
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err.message);
        this.spinner.hide();
      }
    }))
  }
  handlePdfSelection(pdfData: any) {
    this.pdfSelected = [];
    this.pdfSelected.push(pdfData);
    this.getPdfBlobUrl();
  }
  getPdfBlobUrl() {
    this.http.get(this.pdfSelected[0].SAS_PDF_URL, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      this.pdfBlobUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      console.log(this.pdfBlobUrl);
    });
  }

}
