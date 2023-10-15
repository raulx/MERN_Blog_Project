import { useState } from "react";

import axios from "axios";
function ProfileScreen() {
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const [fileSize, setFileSize] = useState();
  const [resolution, setResolution] = useState();
  const presetKey = "ttmvomfe";
  const cloud = "dj5yf27lr";

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", presetKey);
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud}/upload`, formData)
      .then((res) => {
        console.log(res);
        setImage2(res.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setFileSize((file.size / 1000000).toFixed(2));
      const img = new Image();

      img.onload = function () {
        setResolution(`${img.width} x ${img.height}`);
      };
      img.src = URL.createObjectURL(file);
    }
  };
  return (
    <>
      <div>
        <h1>Select an image to upload:</h1>
        <input
          type="file"
          onChange={(e) => {
            handleImageChange(e);
          }}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        <img className="w-96 h-96" src={image2} />
        <h1>
          size:{fileSize}MB <span>Resolution:{resolution}</span>
        </h1>
      </div>
    </>
  );
}

export default ProfileScreen;
