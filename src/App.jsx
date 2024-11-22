import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/PreWedding";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import PreWedding from "./pages/PreWedding";
import Portraits from "./pages/Portraits";

function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation(); 

  return (
    <>
      <ScrollToTop/> 
      <Layout open={open} setOpen={setOpen}>
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pre-wedding" element={<PreWedding />} />
        <Route path="/portrait" element={<Portraits />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/portfolio2" element={<PortfolioGallery />} /> */}
      </Routes>
      </AnimatePresence>
      </Layout>
    </>
  );
}

export default App;
