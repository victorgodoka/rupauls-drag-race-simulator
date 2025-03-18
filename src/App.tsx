import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Casting from "./pages/Casting";
import Season from "./pages/Season";
import Episode from "./pages/Episode";
import Layout from "./components/Layout";
// import Reunion from "./pages/Reunion";
// import Finale from "./pages/Finale";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/casting" element={<Casting />} />
          <Route path="/season" element={<Season />} />
          <Route path="/season/episode/:id" element={<Episode />} />
          {/* <Route path="/season/reunion" element={<Reunion />} /> */}
          {/* <Route path="/season/finale" element={<Finale />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
