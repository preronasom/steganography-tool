import React, { useState } from "react";
import { decodeMessage } from "../utils/stego";

function Decoder() {
  const [image, setImage] = useState(null);
  const [decodedMessage, setDecodedMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDecode = () => {
    if (image) {
      decodeMessage(image).then((message) => {
        setDecodedMessage(message);
      });
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleDecode}>Decode</button>

      {decodedMessage && (
        <div>
          <h3>Decoded Message:</h3>
          <p>{decodedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Decoder;
