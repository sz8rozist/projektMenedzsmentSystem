import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Projekt } from 'src/app/model/Projekt';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFIleComponent {
  projects: Projekt[] = [];
  files: File[] = [];
  uploadFileForm: FormGroup;
  constructor(
    private projektService: ProjectService,
    private fileUploadService: FileUploadService
  ) {
    this.uploadFileForm = new FormGroup({
      projektId: new FormControl('', [Validators.required]),
      file: new FormControl(''),
    });
  }

  ngOnInit() {
    this.loadProjekt();
  }

  loadProjekt() {
    this.projektService.listAllProject().subscribe((project: any) => {
      this.projects = [...project.response];
    });
  }

  onFileSelect(event: any) {
    this.files.push(event.target.files[0]);
  }

  deleteFile(index: any) {
    console.log(index);
    if (index >= 0 && index < this.files.length) {
      this.files.splice(index, 1); // Töröld az adott indexű elemet a tömbből
    }
  }

  onUpload() {
    if (this.uploadFileForm.valid && this.files.length > 0) {
      const formData = new FormData();
      for (const file of this.files) {
        formData.append('files', file, file.name);
      }
      this.fileUploadService
        .uploadFile(
          formData,
          this.uploadFileForm.get('projektId')?.value as number
        )
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  onDownloadFile(filename: string): void {
    this.fileUploadService.download(filename).subscribe(
      response => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
