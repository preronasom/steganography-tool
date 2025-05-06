import React, { useState } from "react";
import { encodeMessage } from "../utils/stego"; // Ensure this handles encryption

function Encoder() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEncode = async () => {
    if (!message || !image || !password) {
      setStatus("❌ All fields are required");
      return;
    }

    setStatus("🔐 Encoding...");
    try {
      const encodedImg = await encodeMessage(image, message, password);
      setStatus("✅ Message encoded successfully!");

      // Automatically download the encoded image
      const link = document.createElement("a");
      link.href = encodedImg;
      link.download = "encoded_image.png";
      document.body.appendChild(link); // Needed for Firefox
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setStatus("❌ Failed to encode. Try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Encode Message</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br />
      <br />

      <textarea
        placeholder="Enter secret message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleEncode}>Encode</button>
      <p>{status}</p>
    </div>
  );
}

export default Encoder;
