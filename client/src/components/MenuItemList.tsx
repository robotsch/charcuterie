import { Fragment } from "react";

import MenuItem from "./MenuItem";

import { FoodItem, FoodItems, Category } from "../../ts/foodItem_interface";

export default function MenuItemList(props: Category) {
  const { name, menuItems } = props;

  const menuItemList = menuItems.map((menuItem: FoodItem) => {
    return (
      <MenuItem
        key={menuItem.id}
        id={menuItem.id}
        category={menuItem.category}
        name={menuItem.name}
        price={menuItem.price}
        url={menuItem.url}
        description={menuItem.description}
      ></MenuItem>
    );
  });

  return (
    <section>
      <h1>{name}</h1>
      {menuItemList}
    </section>
  );
}
