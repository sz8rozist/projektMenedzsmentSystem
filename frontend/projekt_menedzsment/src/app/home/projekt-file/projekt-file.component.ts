import { Component } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { UploadFile } from 'src/app/model/UploadFile';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-projekt-file',
  templateUrl: './projekt-file.component.html',
  styleUrls: ['./projekt-file.component.css'],
})
export class ProjektFileComponent {
  isHovered: boolean = false;
  uploadFiles: UploadFile[] = [];

  constructor(private fileUploadService: FileUploadService) {}

  addClass() {
    this.isHovered = true;
  }
  removeClass() {
    this.isHovered = false;
  }

  ngOnInit() {
    this.fileUploadService.getFiles().subscribe((response: any) => {
      console.log(response);
      this.uploadFiles = [...response];
    });
  }

  download(id: any, fileName: string) {

    this.fileUploadService.download(id).subscribe(response =>{
      console.log(response);
      if(response){
        const url = URL.createObjectURL(response as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    })
  }
}
