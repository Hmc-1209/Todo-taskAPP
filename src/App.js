import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Components */
import Contents from "./components/Contents";
import Tags from "./components/Tag";
import Layout from "./components/Layout";
import Home from "./components/Home";

function App() {
  return (
    <div style={{ marginTop: "3%", marginLeft: "12%", marginRight: "12%" }}>
      <BrowserRouter>
        <Routes>
          {/* Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="contents" element={<Contents />} />
            <Route path="tags" element={<Tags />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
