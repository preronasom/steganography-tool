import React, { useState } from "react";
import { encodeMessage } from "../utils/stego";
import { saveAs } from "file-saver";

function Encoder() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [encodedImage, setEncodedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEncode = () => {
    if (message && image) {
      encodeMessage(image, message).then((encodedImg) => {
        setEncodedImage(encodedImg);
        const link = document.createElement("a");
        link.href = encodedImg;
        link.download = "encoded_image.png";
        link.click();
      });
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Enter message to hide"
        value={message}
        onChange={handleMessageChange}
      />
      <button onClick={handleEncode}>Encode</button>

      {encodedImage && (
        <div>
          <h3>Encoded Image:</h3>
          <img src={encodedImage} alt="Encoded" />
        </div>
      )}
    </div>
  );
}

export default Encoder;
