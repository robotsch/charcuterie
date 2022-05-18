import { useState } from "react";

import MenuItemList from "./MenuItemList";
import MenuItemPage from "./MenuItemPage";

import { salads, soups } from "../mockdata";

import ToggleDrawerProvider from "../providers/ToggleDrawerProvider";

export default function Menu() {
  const [menuItem, setMenuItem] = useState({
    id: 1,
    name: "Seaweed & Tofu Salad",
    category: 1,
    price: 1600,
    url: "/assets/img/seaweed-tofu-salad.jpeg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });

  console.log("menuItem in Menu", menuItem);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  const categories = [salads, soups];

  const categoryMenu = categories.map((category) => {
    return (
      <MenuItemList
        toggleDrawer={toggleDrawer}
        setMenuItem={setMenuItem}
        key={category.id}
        {...category}
      ></MenuItemList>
    );
  });

  return (
    <ToggleDrawerProvider>
      <MenuItemPage
        menuItem={menuItem}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      />
      {categoryMenu}
    </ToggleDrawerProvider>
  );
}
