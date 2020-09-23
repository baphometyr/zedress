import { Component, OnInit } from '@angular/core';
import { Garment } from '../Models/Garment'
import { Brand } from '../Models/Brand';
import { Department } from '../Models/Department';
import { Size } from '../Models/Size';
import { Supplier } from '../Models/Supplier';
import { Banner } from '../Models/Banner';
import { General } from '../Models/General';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from '../services/product.service'
import { FstoreService } from '../services/fstore.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  product: General<Garment>[] = new Array<General<Garment>>();
  banner: General<Banner>[] = new Array<General<Banner>>();

  constructor(private db: FstoreService, private proServ: ProductService) { }

  ngOnInit(): void {
    this.db.getBanner().subscribe((res) => {
      this.banner = res.map(r =>{
        return { ID: r.payload.doc.id, data: r.payload.doc.data() as Banner}
      })
    })

    this.db.getGarment().subscribe((res) => {
      this.product = res.map(r => {
        return { ID: r.payload.doc.id, data: r.payload.doc.data() as Garment }
      })
    })

  }

  deleteProduct(ID){
    this.db.deleteProduct(ID);
  }

  setProduct(item){
    this.proServ.setProduct(item);
  }
}
