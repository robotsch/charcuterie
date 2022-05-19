import { ObjectId } from "mongodb";

export default class Restaurant {
    constructor(
      public _id: ObjectId,
      public name: string, 
      public menu_items: Menu_Item, 
      public employees: Employee, 
      
      ) {}
}

export class Menu_Item {
  constructor(
    public _id: ObjectId,
    public price: number,
    public description: string,
    public image_url: string,
    public category: string
  ) {}
}

export class Employee {
  constructor(
    public _id: ObjectId,
    public name: string
  ) {}
}