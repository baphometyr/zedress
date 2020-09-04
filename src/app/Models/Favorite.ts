import { User } from './User'
import { Garment } from './Garment'

export class Favorite{
    ID: number;
    IDUser: User;
    IDGarment: Garment;
    Date: Date;
}