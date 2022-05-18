import { useContext } from "react";

import { socketContext } from "./SocketProvider";
import { restaurantContext } from "./RestaurantProvider";
import { tableContext } from "./TableProvider";

export default function UseSocketState() {
  const { socket } = useContext(socketContext);
  const { restaurant } = useContext(restaurantContext);
  const { table } = useContext(tableContext);
}
