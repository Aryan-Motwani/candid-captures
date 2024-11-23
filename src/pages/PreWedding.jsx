import { useState, useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import { GrClose } from "react-icons/gr";
import Footer from "../components/Footer";
import InstagramSection from "../components/InstagramSection";
import PageAnimation from "../components/PageAnimation";
import "./PortfolioGallery.css";

export default function PreWedding() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Photos");
  const gridRef = useRef(null);

  const filterCategories = ["Photos", "Videos"];

  useEffect(() => {
    fetch("/data/portfolio-images.json")
      .then((response) => response.json())
      .then((data) => setPortfolioItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const filteredItems = portfolioItems.filter(
    (item) => item.category === selectedCategory
  );

  // Intersection Observer for Scroll Animations
  useEffect(() => {
    if (!gridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.2 } // Trigger animation when 20% of the item is visible
    );

    const items = gridRef.current.querySelectorAll(".item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [filteredItems]);

  return (
    <HelmetProvider>
      <Helmet>
        <title> Candid Captures | Pre Wedding </title>
        <meta
          name="description"
          content="Browse NM Photography's extensive portfolio of photography and videography, featuring a diverse range of styles and subjects."
        />
      </Helmet>
      <PageAnimation>
        <main>
          <div className="wrapper min-h-screen pt-[120px] pb-[50px] md:pt-[170px] md:pb-[100px] mt-10">
            <div className="flex justify-between gap-y-4 gap-x-8 mb-[50px] flex-wrap">
              <h2>Pre Wedding</h2>
              <div className="flex flex-wrap gap-y-2 gap-x-1">
                {filterCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterClick(category)}
                    className={`px-3 py-1 capitalize ${
                      selectedCategory === category ? "active" : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div ref={gridRef} className="grid grid-cols-2 gap-4 lg:gap-12">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className={`item opacity-0 transition-all duration-500 transform scale-95 cursor-pointer ${
                    index % 2 === 0 ? "ml-6" : "mr-6"
                  }`} // Misalignment effect
                  onClick={() => handleItemClick(index)}
                >
                  {item.type === "image" ? (
                    <img
                      loading="lazy"
                      src={item.path}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.path}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Full-Screen Lightbox */}
          {open && (
            <Lightbox
              render={{
                iconPrev: () => <LiaAngleLeftSolid size={40} />,
                iconNext: () => <LiaAngleRightSolid size={40} />,
                iconClose: () => <GrClose size={32} />,
              }}
              styles={{
                container: { backgroundColor: "rgba(0, 0, 0, .85)" },
                slide: { cursor: "grab" },
              }}
              open={open}
              close={() => setOpen(false)}
              slides={filteredItems.map((item) =>
                item.type === "image"
                  ? { src: item.path }
                  : { html: `<video src="${item.path}" controls autoplay muted></video>` }
              )}
              index={currentIndex}
            />
          )}

          <InstagramSection />
          <Footer />
        </main>
      </PageAnimation>
    </HelmetProvider>
  );
}
