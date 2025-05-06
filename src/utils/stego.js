import CryptoJS from "crypto-js";

/**
 * Encodes a message into an image using canvas pixel manipulation.
 * Encrypts the message using AES and embeds it in the image.
 */
export const encodeMessage = async (imageDataUrl, message, password) => {
    const encryptedMessage = CryptoJS.AES.encrypt(message, password).toString();

    const img = new Image();
    img.src = imageDataUrl;

    await new Promise((resolve) => (img.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;

    const messageBinary = toBinary(encryptedMessage + "<<<END>>>");

    for (let i = 0; i < messageBinary.length && i * 4 < pixels.length; i++) {
        pixels[i * 4] = (pixels[i * 4] & 0xfe) | parseInt(messageBinary[i]); // Store bit in R channel LSB
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL("image/png");
};

/**
 * Decodes a message from an image. Extracts binary from pixel LSBs,
 * converts to text, and decrypts with password.
 */
export const decodeMessage = async (imageDataUrl, password) => {
    const img = new Image();
    img.src = imageDataUrl;

    await new Promise((resolve) => (img.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;

    let binary = "";
    for (let i = 0; i < pixels.length; i += 4) {
        binary += (pixels[i] & 1).toString(); // Extract from R channel LSB
    }

    const chars = [];
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.substr(i, 8);
        if (byte.length < 8) break;
        const char = String.fromCharCode(parseInt(byte, 2));
        chars.push(char);
        if (chars.join("").includes("<<<END>>>")) break;
    }

    const encrypted = chars.join("").replace("<<<END>>>", "");

    let decrypted = "";
    let decryptionError = false;

    try {
        decrypted = CryptoJS.AES.decrypt(encrypted, password).toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            decryptionError = true; // empty = wrong password
        }
    } catch (e) {
        decryptionError = true;
    }

    return { decrypted, decryptionError };
};


/**
 * Converts a string into its binary representation.
 */
function toBinary(str) {
    return str.split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("");
}
