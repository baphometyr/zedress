import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Banner } from '../Models/Banner';
import { FstoreService } from '../services/fstore.service';

@Component({
  selector: 'app-new-banner',
  templateUrl: './new-banner.component.html',
  styleUrls: ['./new-banner.component.scss']
})
export class NewBannerComponent implements OnInit {
  newBannerForm: FormGroup;
  image:any;
  imagePercent:number;
  prog:string;
  file;
  flagUpload:boolean = false;

  constructor(private formBuilder: FormBuilder, private storage: AngularFireStorage, private db:FstoreService) { }

  ngOnInit(): void {
    this.createForm();
    this.image = "";
  }

  createForm(){
    this.newBannerForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Subtitle: ['']
    })
  }

  uploadImage(event){
    this.file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.image = event.target.result;
    }
  }

  upBanner(){
    try{
      let filepath = 'banner/test.jpg';
      let ref = this.storage.ref(filepath);
      let task = ref.put(this.file);
      task.percentageChanges().subscribe((res) => {
        this.imagePercent = parseInt(res.toString());
        this.prog = res + "%";
      })
      
      let banner:Banner = {
        Title: this.newBannerForm.controls["Title"].value,
        Subtitle: this.newBannerForm.controls["Subtitle"].value,
        Image: 'referencia a storage'
      };
  
      this.db.addBanner(banner).then((res) =>{
        this.flagUpload = true;      
      });
    }
    catch{}
  }
}
