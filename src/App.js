import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Components */
import Contents from "./components/contents";
import Tags from "./components/tags";
import Layout from "./components/layout";

function App() {
  return (
    <div style={{ marginTop: "3%", marginLeft: "12%", marginRight: "12%" }}>
      <BrowserRouter>
        <Routes>
          {/* Routes */}
          <Route path="/" element={<Layout />}>
            <Route path="contents" element={<Contents />} />
            <Route path="tags" element={<Tags />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
