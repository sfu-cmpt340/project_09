// ImageUploadPage.jsx

import React, { useState } from 'react';

const ImageUploadPage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Image Upload Page</h1>
      <input type="file" onChange={handleImageChange} />
      {image && (
        <div>
          <h2>Preview:</h2>
          <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploadPage;
