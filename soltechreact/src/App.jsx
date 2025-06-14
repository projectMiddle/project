import "./App.css";
import { Route, Routes } from "react-router-dom";
import Yongjae from "./test/yongjae";
import Mikyung from "./test/Mikyung";
import Byeongsun from "./test/Byeongsun";
import Seungchan from "./test/Seungchan";
import Yongsung from "./test/Yongsung";

function App() {
  return (
    <Routes>
      <Route path="/yongjae" element={<Yongjae />} />
      <Route path="/mikyung" element={<Mikyung />} />
      <Route path="/byeongsun" element={<Byeongsun />} />
      <Route path="/seungchan" element={<Seungchan />} />
      <Route path="/yongsung" element={<Yongsung />} />
    </Routes>
  );
}

export default App;
