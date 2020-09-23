import { Brand } from './Brand'
import { Department } from './Department'
import { Size } from './Size'
import { Supplier } from './Supplier'

export class Garment{
    IDBrand: Brand;
    IDDepartment: Department;
    IDSize: Size;
    IDSupplier: Supplier;
    Name: string;
    Price: number;
    Stock: number;
}