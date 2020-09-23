import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Brand } from '../Models/Brand';
import { FstoreService } from '../services/fstore.service'
import { Size } from 'ngx-spinner/lib/ngx-spinner.enum';
import { Supplier } from '../Models/Supplier';
import { Department } from '../Models/Department';
import { Garment } from '../Models/Garment';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  newProductForm: FormGroup;
  brands: Brand[] = new Array<Brand>();
  departments: Department[] = new Array<Department>();
  sizes: Size[] = new Array<Size>();
  suppliers: Supplier[] = new Array<Supplier>();

  constructor(private formBuilder: FormBuilder, private db: FstoreService) { }
  
  ngOnInit(): void {
    this.createForm();

    this.db.getBrandsData().subscribe((req) => {
      this.brands = req as Brand[];
      this.newProductForm.controls["name"].setValue(this.brands[0]?.Name);
    });

    this.db.getDepartmentsData().subscribe((req) => {
      this.departments = req as Department[];
      this.newProductForm.controls["Brand"].setValue(this.departments[0]?.Name);
    })

    this.db.getSizesData().subscribe((req) => {
      this.sizes = req as Size[];
      this.newProductForm.controls["Brand"].setValue(this.sizes[0]);
    })

    this.db.getSuppliersData().subscribe((req) => {
      this.suppliers = req as Supplier[];
      this.newProductForm.controls["Brand"].setValue(this.suppliers[0]?.Name);
    })
  }

  createForm(){
    this.newProductForm = this.formBuilder.group({
      brand: [''],
      department: [''],
      size: [''],
      supplier: [''],
      name: ['', Validators.required],
      price: [''],
      stock: ['', Validators.compose([Validators.min(0), Validators.max(100)])]
    })
  }

  addProduct(){
    let product:Garment = {
      Name : this.newProductForm.controls["name"].value,
      IDBrand : this.newProductForm.controls["brand"].value,
      IDDepartment : this.newProductForm.controls["department"].value,
      IDSize : this.newProductForm.controls["size"].value,
      IDSupplier : this.newProductForm.controls["supplier"].value,
      Stock : 10,
      Price: 10.99
    };
    this.db.addProduct(product);
  }

  isDirty = (controlName:string) => this.newProductForm.controls[controlName].dirty;
  isValid = (controlName:string) => this.newProductForm.controls[controlName].valid;
}