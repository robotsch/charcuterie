export type TipType = "PERCENT" | "AMOUNT";

export interface SubOrder {
  menu_item_id: string;
  name: string;
  quantity: number;
  totalPrice: number;
}

export interface Customer {
  name: string;
  sub_orders: Array<SubOrder>;
}

export interface OrderForTable {
  _id: string;
  table_id: string;
  restaurant_id: string;
  customers: Array<Customer>;
}

export interface BillItem {
  menu_item_id: string;
  name: string;
  quantity: number;
  totalPrice: number;
}

export interface Bill {
  [key: string]: BillItem;
}
