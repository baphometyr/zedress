import { Component, OnInit } from '@angular/core';
import { FstoreService } from '../services/fstore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from '../Models/Brand';
import { Department } from '../Models/Department';
import { Size } from '../Models/Size';
import { Supplier } from '../Models/Supplier';
import { Garment } from '../Models/Garment';
import { ProductService } from '../services/product.service';
import { General } from '../Models/General';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: General<Garment>;
  editProductForm: FormGroup;
  brands: Brand[] = new Array<Brand>();
  departments: Department[] = new Array<Department>();
  sizes: Size[] = new Array<Size>();
  suppliers: Supplier[] = new Array<Supplier>();

  constructor(private formBuilder: FormBuilder, private db: FstoreService, private proServ: ProductService) {
    this.product = proServ.getProduct();
  }

  ngOnInit(): void {
    this.db.getBrandsData().subscribe((req) => {
      this.brands = req as Brand[];
    });

    this.db.getDepartmentsData().subscribe((req) => {
      this.departments = req as Department[];
    })

    this.db.getSizesData().subscribe((req) => {
      this.sizes = req as Size[];
    })

    this.db.getSuppliersData().subscribe((req) => {
      this.suppliers = req as Supplier[];
    })
    
    this.createForm();
  }

  createForm(){
    this.editProductForm = this.formBuilder.group({
      brand: [this.product.data.IDBrand.Name],
      department: [this.product.data.IDBrand.Name],
      size: [this.product.data.IDSize.Name],
      supplier: [this.product.data.IDSupplier.Name],
      name: [this.product.data.Name, Validators.required],
      description: [this.product.data.Description, Validators.required],
      price: [this.product.data.Price],
      stock: [this.product.data.Stock, Validators.compose([Validators.min(0), Validators.max(100)])]
    })
  }

  updateProduct(){
    let newProduct:any = {
      IDBrand: '/brand/CONCATENAR_ID',
      IDDepartment: '/Department/CONCATENAR_ID',
      IDSize: '/IDSize/CONCATENAR_ID',
      IDSupplier: '/Supplier/CONCATENAR_ID',
      Name: "chiquilla que te pasa???",
      Description: "descripcion",
      Stock: 123,
      Price:0
    };
    // this.product.data = {
    //   IDBrand: {Name: "prueba"},
    //   IDDepartment: {Name: "prueba"},
    //   IDSize: {Name: "Prueba", Label:"prueba"},
    //   IDSupplier: {Name: "Prueba"},
    //   Name: "chiquilla que te pasa???",
    //   Stock: 123,
    //   Price:0
    // }

    this.db.updateProduct(this.product, newProduct);
  }

  isDirty = (controlName:string) => this.editProductForm.controls[controlName].dirty;
  isValid = (controlName:string) => this.editProductForm.controls[controlName].valid;
}