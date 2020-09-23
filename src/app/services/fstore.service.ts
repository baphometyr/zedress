import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Banner } from '../Models/Banner';
import { Brand } from '../Models/Brand';
import { Garment } from '../Models/Garment'
import { General } from '../Models/General'

@Injectable({
  providedIn: 'root'
})
export class FstoreService {

  constructor(private firestore: AngularFirestore) { }

  // READ
  getBrandsData = () => this.firestore.collection('Brand').valueChanges();
  getDepartmentsData = () => this.firestore.collection('Department').valueChanges();
  getSizesData = () => this.firestore.collection('Size').valueChanges();
  getSuppliersData = () => this.firestore.collection('Supplier').valueChanges();

  getBrands = () => this.firestore.collection('Brand').snapshotChanges();
  getGarment = () => this.firestore.collection('Garment').snapshotChanges();
  getBanner = () => this.firestore.collection('ImageBanner').snapshotChanges();
  
  // CREATE
  addProduct = (product:Garment) => this.firestore.collection("Garment").add(product);
  addBanner = (banner:Banner) => this.firestore.collection("ImageBanner").add(banner)
  
  // REMOVE
  deleteProduct = (ID) => {
    this.firestore.collection("Garment").doc(ID).delete();
  }
}
