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
  errorLogin: boolean = false;
  loginForm: FormGroup;
  correo: string = "";
  pass: string = "";

  constructor(public auth: AngularFireAuth, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.loginForm = this.formBuilder.group({
      correo: ['', Validators.compose([
        Validators.required /*, Validators.email*/])],
      pass: ['', Validators.compose([
        Validators.required /*, Validators.minLength(8)*/])]
    })
  }

  login()
  {
    this.correo = this.loginForm.controls["correo"].value;
    this.pass = this.loginForm.controls["pass"].value;
    this.auth.user.subscribe((usuario) => {
      this.errorLogin = usuario ? false : true;
    })
    this.auth.signInWithEmailAndPassword(`${this.correo}`, `${this.pass}`);
  }

  logout() 
  {
    this.auth.signOut();
  }
}

  
  
