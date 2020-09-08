import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-new-banner',
  templateUrl: './new-banner.component.html',
  styleUrls: ['./new-banner.component.scss']
})
export class NewBannerComponent implements OnInit {
  newBannerForm: FormGroup;
  imagen:string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.imagen = "";
  }

  createForm(){
    this.newBannerForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Subtitle: ['']
    })
  }
}
