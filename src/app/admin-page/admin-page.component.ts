import { Component, OnInit } from '@angular/core';
import { Garment } from '../Models/Garment'
import { Brand } from '../Models/Brand';
import { Department } from '../Models/Department';
import { Size } from '../Models/Size';
import { Supplier } from '../Models/Supplier';
import { Banner } from '../Models/Banner';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  product: Garment[] = new Array<Garment>();
  banner: Banner[] = new Array<Banner>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('ImageBanner').valueChanges().subscribe((req) => {
      this.banner = req as Banner[];
    })

    this.db.collection('Garment').valueChanges().subscribe((req) => {
      this.product = req as Garment[];
    })
  }

}
