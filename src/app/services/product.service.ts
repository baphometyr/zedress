import { Injectable } from '@angular/core';
import { Garment } from '../Models/Garment';
import { General } from '../Models/General';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: General<Garment>;

  constructor() { }

  getProduct = () => this.product;
  setProduct = (product) => this.product = product;
}
