import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Components */
import Contents from "./components/Contents";
import Tags from "./components/Tag";
import Layout from "./components/Layout";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="contents" element={<Contents />} />
          <Route path="tags" element={<Tags />} />
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
