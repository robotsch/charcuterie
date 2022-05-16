import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import MenuItem from "./MenuItem";

import { FoodItem, Category } from "../../ts/foodItem_interface";

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
    <Accordion disableGutters defaultExpanded>
      <AccordionSummary>
        <h3 className="mont">{name}</h3>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: 0,
        }}
      >
        {menuItemList}
      </AccordionDetails>
    </Accordion>
  );
}
