import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import axios from "axios";
import ImageModel from "./Imagemodel";

const Gallery = () => {
  const { search } = useGlobalContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const apiKey = import.meta.env.VITE_UNSPLASH_KEY;

  const fetchImages = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?query=${search}&per_page=12&client_id=${apiKey}`
      );
      setData(res.data.results || []);
    } catch (error) {
      console.error("Error fetching images:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [search]);

  const openModal = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "16px" }}>Loading images...</p>
      ) : Array.isArray(data) && data.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {data.map((img) => (
            <div
              key={img.id}
              onClick={() => openModal(img)}
              style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <img
                src={img.urls.small}
                alt={img.alt_description || "Unsplash Image"}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  background: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  padding: "6px",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                {img.user.name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "16px" }}>No images found. Try searching something!</p>
      )}

      {selectedImage && (
        <ImageModel open={modalOpen} handleClose={closeModal} image={selectedImage} />
      )}
    </div>
  );
};

export default Gallery;
