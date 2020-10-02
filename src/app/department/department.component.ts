import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Garment } from '../Models/Garment';
import { General } from '../Models/General';
import { FstoreService } from '../services/fstore.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departmentName: string;
  garments: General<Garment>[] = new Array<General<Garment>>();

  constructor(private activeRoute: ActivatedRoute, private db: FstoreService) { }

  ngOnInit(): void {
    this.departmentName = this.activeRoute.snapshot.params.department;
    this.db.getGarmentByDepartment(this.departmentName).subscribe((res) => {
      this.garments = res.map(r =>{
        return { ID:r.payload.doc.id, data:r.payload.doc.data() as Garment}
      })
    });
  }

}
