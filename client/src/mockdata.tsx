import { Category, Order, OrderList } from "../ts/foodItem_interface";

export const salads: Category = {
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

export const soups: Category = {
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

export const order: Order = {
  id: 1,
  group: 1,
  table: "2",
  timePlaced: "placeholder time",
  orderFoodItems: [
    {
      id: 1,
      name: "Seaweed & Tofu Salad",
      category: 1,
      price: 1600,
      url: "/assets/img/seaweed-tofu-salad.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      quantity: 2,
    },
    {
      id: 2,
      name: "Sashimi Salad",
      category: 1,
      price: 1900,
      url: "/assets/img/sashimi-salad.jpeg",
      description:
        "Lorem ipsu dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      quantity: 4,
    },
  ],
};

export const orderList: OrderList = {
  group: 1,
  table: "2",
  orders: [order],
};
