import { Fragment } from "react";

import MenuItem from "./MenuItem";

export default function MenuItemList() {
  const menuItems = [
    {
      name: "Tofu & Seaweed Salad",
      category: 1,
      price: 300,
      url: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      // calories: 100,
      // protein: 4,
      // carbs: 5,
      // fats: 1,
    },
    {
      name: "Tofu & Seaweed Salad 2",
      category: 1,
      price: 300,
      url: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      // calories: 100,
      // protein: 4,
      // carbs: 5,
      // fats: 1,
    },
  ];

  const menuItemList = menuItems.map((menuItem) => {
    return (<MenuItem 
      name={menuItem.name}
      price={menuItem.price}
      url={menuItem.url}
      description={menuItem.description}
    ></MenuItem>);
  });

  return <Fragment>{menuItemList}</Fragment>;
}
