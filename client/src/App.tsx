import { useState } from "react";
import "./App.scss";

// import MenuItem from "./components/MenuItem";
import MenuItemList from "./components/MenuItemList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <MenuItemList></MenuItemList>
    </div>
  );
}

export default App;
