import { useState, createContext } from "react";

export const restaurantContext = createContext<any | null>(null);

export default function RestaurantProvider(props: any) {
  const [restaurant, setRestaurant] = useState();

  return (
    <restaurantContext.Provider value={{ restaurant, setRestaurant }}>
      {props.children}
    </restaurantContext.Provider>
  );
}
