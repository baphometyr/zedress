import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Banner } from '../Models/Banner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  banner: Banner[] = new Array<Banner>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('ImageBanner').valueChanges().subscribe((req) => {
      this.banner = req as Banner[];
    })
  }

}
