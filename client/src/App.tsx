import { useState } from "react";
import "./App.scss";

import MenuItemList from "./components/MenuItemList";

import { Category } from "../ts/foodItem_interface";
import TemporaryDrawer from "./components/SidebarDrawer";

export default function App() {
  const salads: Category = {
    id: 1,
    name: "Salads",
    menuItems: [
      {
        id: 1,
        name: "Seaweed & Tofu Salad",
        category: 1,
        price: 1600,
        url: "/assets/img/seaweed-tofu-salad.jpeg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 2,
        name: "Sashimi Salad",
        category: 1,
        price: 1900,
        url: "/assets/img/sashimi-salad.jpeg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  };

  const soups: Category = {
    id: 2,
    name: "Soups",
    menuItems: [
      {
        id: 3,
        name: "Miso Soup",
        category: 2,
        price: 300,
        url: "/assets/img/miso-soup.jpeg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  };

  const categories = [salads, soups];

  const categoryMenu = categories.map((category) => {
    return (
      <MenuItemList
        key={category.id}
        id={category.id}
        name={category.name}
        menuItems={category.menuItems}
      ></MenuItemList>
    );
  });

  const [state, setState] = useState({ left: false });

  return (
    <div className="App">
      <TemporaryDrawer />
      {categoryMenu}
    </div>
  );
}
