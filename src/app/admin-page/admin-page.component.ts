import { Component, OnInit } from '@angular/core';
import { Garment } from '../Models/Garment'
import { Brand } from '../Models/Brand';
import { Department } from '../Models/Department';
import { Size } from '../Models/Size';
import { Supplier } from '../Models/Supplier';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  product: Array<Garment> = new Array<Garment>();

  constructor() { }

  ngOnInit(): void {
    this.product.push({
      ID: 1,
      IDBrand: new Brand(),
      IDDepartment: new Department(),
      IDSize: new Size(),
      IDSupplier: new Supplier(),
      Name: "Pantalon",
      Price: 129.2,
      Stock: 1
    },
    {
      ID: 2,
      IDBrand: new Brand(),
      IDDepartment: new Department(),
      IDSize: new Size(),
      IDSupplier: new Supplier(),
      Name: "Blusa",
      Price: 29.2,
      Stock: 10
    });
  }

}
