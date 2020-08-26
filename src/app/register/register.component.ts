import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorRegister: boolean = false;
  registerForm: FormGroup;
  correo: string = "";
  pass: string = "";

  constructor(public auth: AngularFireAuth, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.registerForm = this.formBuilder.group({
      correo: ['', Validators.compose([
        Validators.required /*, Validators.email*/])],
      pass: ['', Validators.compose([
        Validators.required /*, Validators.minLength(8)*/])]
    })
  }

  register()
  {
    this.correo = this.registerForm.controls["correo"].value;
    this.pass = this.registerForm.controls["pass"].value;
    this.auth.user.subscribe((usuario) => {
      this.errorRegister = usuario ? false : true;
    })
    this.auth.signInWithEmailAndPassword(`${this.correo}`, `${this.pass}`);
  }

  logout() 
  {
    this.auth.signOut();
  }

}
