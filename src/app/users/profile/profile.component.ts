import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public images: any = null;
  public labelText: string = 'Upload profile photo';
  public profileForm: FormGroup;
  public fileExtensionError: boolean;
  public fileSizeError: boolean;
  public fileValid: boolean;
  public fileExtensionMessage: string;

  public imageProfile = new FormControl();

  constructor(
    private formBuild: FormBuilder,
    private domSanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.profileForm = this.formBuild.group({
      imageProfile: this.imageProfile,
    });
  }

  public onFileSelect(event: any): void {
    const file = event?.target?.files as FileList;
    if (!file.length) {
      return;
    }
    console.log('file size', event.target.files[0].size);
    console.log('file name', event.target.files[0].name);
    // checking file format and file size
    let filename = event.target.files[0].name;
    let fileExtension: any;
    let allowedExtensions = ['JPG', 'JPEG', 'PNG', 'JFIF'];
    fileExtension = filename.split('.').pop();

    if (this.isFileContains(allowedExtensions, fileExtension)) {
      if (event.target.files[0].size < 2000000) {
        this.fileExtensionError = false;
        this.fileExtensionMessage = '';
        this.fileValid = true;
      } else {
        this.fileExtensionMessage = 'Max size limit crossed';
        this.fileSizeError = true;
        this.fileValid = false;
      }
    } else {
      this.fileExtensionMessage = 'Invalid File format';
      this.fileExtensionError = true;
      this.fileValid = false;
    }

    if (event.target.files) {
      let filesAmount = event.target.files.length;
      if (filesAmount != null) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          // Push Base64 string
          this.images = event.target.result;
          this.images = this.domSanitizer.bypassSecurityTrustUrl(this.images);
        };
        this.labelText = 'Change profile photo';
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  public isFileContains(array, word) {
    array = array.map((val) => val.toLowerCase());
    return array.indexOf(word.toLowerCase()) > -1;
  }

  public remove(): void {
    this.images = null;
    this.labelText = 'Upload profile photo';
  }
}
