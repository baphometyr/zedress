import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFlag: boolean = false;
  loginForm: FormGroup;
  correo: string = "";
  pass: string = "";
  intent = 0;

  constructor(public auth: AngularFireAuth, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.loginForm = this.formBuilder.group({
      correo: ['', Validators.compose([
        Validators.required, Validators.email])],
      pass: ['', Validators.compose([
        Validators.required /*, Validators.minLength(8)*/])]
    })
  }

  login()
  {
    this.intent += 1;
    this.correo = this.loginForm.controls["correo"].value;
    this.pass = this.loginForm.controls["pass"].value;
    this.auth.signInWithEmailAndPassword(`${this.correo}`, `${this.pass}`)
    .then((req) => {
      this.loginFlag = req.user ? true : false;
    });
  }

  logout() 
  {
    this.auth.signOut();
  }

  correoValid(){
    if(this.loginForm.controls['correo'].errors)
      return this.loginForm.controls['correo'].errors.required && this.loginForm.controls['correo'].dirty
    else
      return false
  }
  
  formatMail(){
    if(this.loginForm.controls['correo'].errors)
      return this.loginForm.controls["correo"].errors.email && this.intent>0;
    else 
      return false;
  } 
}

  
  
