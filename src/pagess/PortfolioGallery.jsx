import { useState, useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import { GrClose } from "react-icons/gr";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Footer from "../components/Footer";
import InstagramSection from "../components/InstagramSection";
import PageAnimation from "../components/PageAnimation";
import {Gallery} from "react-gallery-grid";
import "./PortfolioGallery.css"; // Add custom styles here

export default function Portfolio() {
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("wedding");
  const gridRef = useRef(null);

  const filterCategories = ["wedding", "pre wedding", "portrait"];

  useEffect(() => {
    fetch("/data/portfolio-images.json")
      .then((response) => response.json())
      .then((data) => setPortfolioImages(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  const filteredImages = portfolioImages.filter(
    (image) => image.category === selectedCategory
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
      { threshold: 0.2 } // Trigger animation when 20% of the image is visible
    );

    const images = gridRef.current.querySelectorAll(".image-item");
    images.forEach((image) => observer.observe(image));

    return () => observer.disconnect();
  }, [filteredImages]);

  return (
    <HelmetProvider>
      <Helmet>
        <title> Candid Captures | Portfolio</title>
        <meta
          name="description"
          content="Browse NM Photography's extensive portfolio of photography, featuring a diverse range of styles and subjects."
        />
      </Helmet>
      <PageAnimation>
        <main>
          <div className="wrapper min-h-screen pt-[120px] pb-[50px] md:pt-[170px] md:pb-[100px]">
            <div className="flex justify-between gap-y-4 gap-x-8 mb-[50px] flex-wrap">
              <h2>Portfolio</h2>
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

            {/* Gallery Grid */}
            <div ref={gridRef}>
              <Gallery
                images={filteredImages.map((img) => ({
                  src: img.path,
                  thumbnail: img.path,
                  caption: img.caption || "",
                  width: img.width || 800,
                  height: img.height || 600,
                }))}
                margin={10} // space between images
                rowHeight={200} // set row height
                onClick={(e, index) => handleImageClick(index)}
                className="gallery-grid"
              />
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
              slides={filteredImages.map((image) => ({ src: image.path }))}
              index={currentImageIndex}
            />
          )}

          <InstagramSection />
          <Footer />
        </main>
      </PageAnimation>
    </HelmetProvider>
  );
}
