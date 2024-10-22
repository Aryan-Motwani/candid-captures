import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { GrClose } from "react-icons/gr";
import { Gallery } from "react-grid-gallery";
import Footer from "../components/Footer";
import InstagramSection from "../components/InstagramSection";
import PageAnimation from "../components/PageAnimation";
// import "react-grid-gallery/dist/styles.css";

export default function PortfolioGallery() {
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("wedding"); // Default to the first category
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

  const filteredImages = portfolioImages
    .filter((image) => image.category === selectedCategory)
    .map((image) => ({
      src: image.path,
      thumbnail: image.path,
      caption: image.caption || "",
      width: 800,
      height: 600,
    }));

  return (
    <HelmetProvider>
      <Helmet>
        <title>NM Photography | Portfolio</title>
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
            <div>
              <Gallery
                images={filteredImages}
                enableImageSelection={false} // Disable selection for a simple gallery
                backdropClosesModal
                lightboxWidth={1536} // Lightbox size when opened
              />
            </div>
          </div>
          <InstagramSection />
          <Footer />
        </main>
      </PageAnimation>
    </HelmetProvider>
  );
}
