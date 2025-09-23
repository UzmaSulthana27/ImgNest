import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import axios from "axios";
import ImageModel from "./Imagemodel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // import css

const Gallery = () => {
  const { search } = useGlobalContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const apiKey = import.meta.env.VITE_UNSPLASH_KEY;

  const fetchImages = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: search, per_page: 12, page: page, client_id: apiKey },
      });

      if (page === 1) {
        setData(res.data.results);
      } else {
        setData((prev) => [...prev, ...res.data.results]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // reset page on search change
  }, [search]);

  useEffect(() => {
    fetchImages();
  }, [search, page]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.scrollHeight &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
          padding: "20px",
        }}
      >
        {data.length === 0 && !loading && <p>No images found!</p>}

        {data.map((img) => (
          <div
            key={img.id}
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setSelectedImage(img)}
          >
            {loading ? (
              <Skeleton height={300} width={300} borderRadius={8} />
            ) : (
              <img
                src={img.urls.small}
                alt={img.alt_description || "Unsplash Image"}
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  transition: "transform 0.3s",
                }}
              />
            )}
          </div>
        ))}

        {loading &&
          Array.from({ length: 12 }).map((_, idx) => (
            <Skeleton key={idx} height={300} width={300} borderRadius={8} />
          ))}
      </div>

      {/* Image Modal */}
      <ImageModel
        open={!!selectedImage}
        handleClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </>
  );
};

export default Gallery;
