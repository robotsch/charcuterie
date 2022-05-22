import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import MenuItem from "./MenuItem";

import { FoodItem } from "../../ts/foodItem_interface";

export default function MenuItemList(props: any) {
  const { name, menuItems, setMenuItem } = props;

  const menuItemList = menuItems.map((menuItem: FoodItem) => {
    // console.log("MenuItemList menuItem", menuItem);
    return (
      <MenuItem
        setMenuItem={setMenuItem}
        key={menuItem._id}
        {...menuItem}
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
