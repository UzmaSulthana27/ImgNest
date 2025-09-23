import React, { useState } from "react";
import { FiDownload, FiCopy } from "react-icons/fi";

const ImageModel = ({ open, handleClose, image }) => {
  const [copied, setCopied] = useState(false);

  if (!open || !image) return null;

  // Download image in new tab (Unsplash safe)
const handleDownload = async () => {
  try {
    const response = await fetch(image.urls.full, { mode: "cors" }); // fetch the image as blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `${image.alt_description || "unsplash-image"}.jpg`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    // release memory
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed:", err);
  }
};


  // Copy image URL to clipboard
  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(image.links.download);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "10px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "20px",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#333",
          }}
        >
          ✖
        </button>

        {/* Image */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Unsplash Image"}
            style={{
              width: "100%",
              maxHeight: "70vh",
              borderRadius: "8px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Info & Actions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "14px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Photographer: {image.user.name}</h3>
            <div style={{ display: "flex", gap: "8px" }}>
              {/* Download Button */}
              <button
                onClick={handleDownload}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1565c0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1976d2")}
              >
                <FiDownload /> Download
              </button>

              {/* Copy URL Button */}
              <button
                onClick={handleCopyURL}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#388e3c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#4caf50")}
              >
                <FiCopy /> Copy URL
                {copied && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-25px",
                      right: "0",
                      background: "#333",
                      color: "#fff",
                      fontSize: "12px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>

          <p style={{ margin: 0 }}>
            <strong>Username:</strong> {image.user.username}
          </p>
          {image.alt_description && (
            <p style={{ margin: 0 }}>
              <strong>Description:</strong> {image.alt_description}
            </p>
          )}
          <p style={{ margin: 0 }}>
            <strong>Likes:</strong> {image.likes}
          </p>

          {/* Tags */}
          {image.tags && image.tags.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {image.tags.map((tag) => (
                <span
                  key={tag.title}
                  style={{
                    background: "#1976d2",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                >
                  {tag.title}
                </span>
              ))}
            </div>
          ) : (
            <small>No tags available</small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModel;
