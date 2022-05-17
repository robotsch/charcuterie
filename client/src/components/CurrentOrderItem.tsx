import { OrderFoodItem } from "../../ts/foodItem_interface";

export default function CurrentOrderItem(props: OrderFoodItem) {
  const { name, price, url, description, quantity } = props;
  return (
    <div>
      {quantity} x {name}
    </div>
  );
}
