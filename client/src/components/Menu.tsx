import MenuItemList from "./MenuItemList";

import { salads, soups } from "../mockdata";

export default function Menu() {
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

  return <>{categoryMenu}</>;
}
