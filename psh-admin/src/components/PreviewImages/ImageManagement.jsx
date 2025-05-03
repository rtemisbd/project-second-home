import { useEffect, useState } from "react";

const ImageManagement = ({ label, uploadedImages, setUploadedImages }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    setImagePreviews([...uploadedImages]);
  }, [uploadedImages]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setUploadedImages((prevFiles) => [...prevFiles, ...files]);

    // Generate image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleRemove = (indexToRemove) => {
    const updatedImages = uploadedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadedImages(updatedImages);

    // Remove from the image previews state
    const updatedPreviews = imagePreviews.filter(
      (_, index) => index !== indexToRemove
    );
    setImagePreviews(updatedPreviews);
  };

  return (
    <form>
      <div className="max-w-lg mx-auto mb-4">
        <label className="form-label profile_label3">{label}</label>
        <input
          type="file"
          className="main_form w-100 p-0"
          multiple
          onChange={handleFileChange}
        />
      </div>

      <div className="max-w-lg mx-auto mb-4 d-flex flex-wrap gap-3">
        {imagePreviews?.map((imageObj, ind) => (
          <div
            key={ind}
            className="form_sub_stream position-relative"
            style={{ marginTop: "12px" }}
          >
            <img
              src={imageObj}
              alt={`Preview ${ind}`}
              height="124px"
              width="124px"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
            <button
              type="button"
              style={{
                height: "24px",
                width: "24px",
                borderRadius: "12px",
                background: "white",
                color: "black",
                boxShadow: "1px 1px 3px rgba(0,0,0,0.3)",
                position: "absolute",
                right: "-8px",
                top: "-8px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleRemove(ind)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </form>
  );
};

export default ImageManagement;
