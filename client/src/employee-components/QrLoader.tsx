import axios from "axios";
import { useEffect, useState } from "react";

export default function QrLoader() {
  // const [menuItem, setMenuItem] = useState({});

  const [qrCode, setQrCode] = useState({});

  let restaurant = "6283f1d9804b848eb5e4560c";
  let table = "6283f6a703f54b7c82c5fffc";

  useEffect(() => {
    axios
      .post(`/api/qr-generate`, {
        // restaurant: restaurant,
        // table: table,
      })
      .then((res) => {
        // const setCategories: Set<string> = new Set(
        //   res.data.map((item: MenuItem) => item.category)
        // );

        // const categories: Array<string> = [...setCategories];

        // const parsedMenu: Menu = {};
        // categories.forEach((category: string) => {
        //   parsedMenu[category] = [];
        // });

        // res.data.forEach((item: MenuItem) => {
        //   parsedMenu[item.category].push(item);
        // });
        console.log("res: ", res);
        setQrCode(res.data);
        //console.log("result: ", res);
      })
      .catch((err) => console.log("ERROR", err));
  }, []);

  return qrCode;
}
