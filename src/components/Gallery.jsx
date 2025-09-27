import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import axios from "axios";
import ImageModel from "./Imagemodel";

const Gallery = () => {
  const { search, filters, perPage } = useGlobalContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [openModel, setOpenModel] = useState(false);

  const handleOpenModel = (image) => {
    setSelectedImage(image);
    setOpenModel(true);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
    setSelectedImage(null);
  };

  const handleDownload = async (url, id) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `unsplash-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const fetchImages = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        query: search,
        per_page: perPage || 9,
        page: pageNumber,
      });

      if (filters.orientation) params.append("orientation", filters.orientation);
      if (filters.color) params.append("color", filters.color);

      const res = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_UNSPLASH_KEY}&${params.toString()}`
      );

      if (pageNumber === 1) {
        setData(res.data.results);
      } else {
        setData((prev) => [...prev, ...res.data.results]);
      }

      setHasMore(res.data.results.length === (perPage || 9));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchImages(1);
  }, [search, filters, perPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) fetchImages(page);
  }, [page]);

  // Internal CSS for loader
  const loaderStyles = {
    loaderContainer: {
      display: "flex",
      justifyContent: "center",
      margin: "30px 0",
    },
    loader: {
      border: "6px solid #f3f3f3",
      borderTop: "6px solid #1e90ff",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      animation: "spin 1s linear infinite",
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Keyframes for spin */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {data.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {data.map((img) => (
            <div
              key={img.id}
              style={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {/* Download Button */}
              <button
                onClick={() => handleDownload(img.urls.full, img.id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  border: "none",
                  borderRadius: "4px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  zIndex: 2,
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                ⬇
              </button>

              {/* Clickable Image */}
              <img
                src={img.urls.small}
                alt={img.alt_description || "Unsplash Image"}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  cursor: "pointer",
                  display: "block",
                }}
                onClick={() => handleOpenModel(img)}
              />
            </div>
          ))}
        </div>
      ) : loading ? (
        <div style={loaderStyles.loaderContainer}>
          <div style={loaderStyles.loader}></div>
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666", fontSize: "18px" }}>
          No images found. Try searching something else!
        </p>
      )}

      {/* Lazy load loader */}
      {loading && page > 1 && (
        <div style={loaderStyles.loaderContainer}>
          <div style={loaderStyles.loader}></div>
        </div>
      )}

      {/* Image preview modal */}
      <ImageModel open={openModel} handleClose={handleCloseModel} image={selectedImage} />
    </div>
  );
};

export default Gallery;