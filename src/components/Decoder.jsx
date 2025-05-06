import React, { useState } from "react";
import { decodeMessage } from "../utils/stego"; // Import decode function

function Decoder() {
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDecode = async () => {
    if (!image || !password) {
      setStatus("❌ All fields are required");
      return;
    }

    setStatus("🔐 Decoding...");
    try {
      const { decrypted, decryptionError } = await decodeMessage(
        image,
        password
      );

      if (decryptionError) {
        setStatus("❌ Wrong password");
        setDecryptedMessage("");
      } else {
        setStatus("✅ Message Decoded");
        setDecryptedMessage(decrypted);
      }
    } catch (err) {
      setStatus("❌ Failed to decode. Try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Decode Message</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
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

      <button onClick={handleDecode}>Decode</button>
      <p style={{ color: status.startsWith("❌") ? "red" : "green" }}>
        {status}
      </p>

      {/* Display Decrypted Message */}
      {decryptedMessage && (
        <div>
          <h3>Secret Message:</h3>
          <textarea
            value={decryptedMessage}
            rows={4}
            readOnly
            style={{ width: "300px", marginBottom: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default Decoder;
