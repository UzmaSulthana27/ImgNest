import React from "react";

const ImageModel = ({ open, handleClose, image }) => {
  if (!open || !image) return null;

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

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
        overflowY: "auto",
      }}
      onClick={handleClose} // close when clicking outside
    >
      <div
        style={{
          backgroundColor: "#fff",
          maxWidth: "900px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close Button on container top-right */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* Image side */}
        <div style={{ flex: 2, minWidth: "300px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Unsplash Image"}
            style={{
              width: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Info side */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            minWidth: "250px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Photographer:</h3>
          <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>{image.user.name}</p>

          <p style={{ margin: "0 0 10px 0" }}>Username: {image.user.username}</p>

          {image.alt_description && (
            <p style={{ margin: "0 0 10px 0" }}>Description: {image.alt_description}</p>
          )}

          <p style={{ margin: "0 0 10px 0" }}>Likes: {image.likes}</p>

          {/* Tags */}
          {image.tags && image.tags.length > 0 ? (
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "10px" }}
            >
              {image.tags.map((tag) => (
                <span
                  key={tag.title}
                  style={{
                    backgroundColor: "#eee",
                    padding: "5px 10px",
                    borderRadius: "16px",
                    fontSize: "12px",
                  }}
                >
                  {tag.title}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
              No tags available
            </p>
          )}

          {/* Download Button in Info Section */}
          <button
            onClick={() => handleDownload(image.urls.full, image.id)}
            style={{
              marginTop: "20px",
              background: "#1e90ff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ⬇ Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModel;