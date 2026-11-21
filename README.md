# Image Steganography – Secure Data Hiding

A web-based image steganography application that allows users to hide and retrieve text messages within images using **Least Significant Bit (LSB) steganography** and **AES encryption**.

The project combines cryptography and image processing to provide an additional layer of confidentiality for sensitive text messages.

## Features

- **Hide Messages:** Embed text messages within images using the Least Significant Bit (LSB) technique.
- **AES Encryption:** Encrypt messages using AES encryption with Crypto-JS before embedding them into images.
- **Retrieve Messages:** Extract hidden messages from images through the decoding process.
- **Image Processing:** Utilize the HTML5 Canvas API for pixel-level image manipulation.
- **Interactive Interface:** Simple web interface built with React.js.

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| HTML5 Canvas API | Image processing and pixel manipulation |
| Crypto-JS | AES encryption and decryption |
| LSB Steganography | Hiding data within image pixels |

## How It Works

The application uses two techniques to protect and conceal text messages:

### 1. AES Encryption
The input message is encrypted using AES encryption through Crypto-JS before being embedded into the image.

### 2. LSB Steganography
The encrypted message is embedded into the least significant bits of image pixel values. This allows data to be hidden while minimizing visible changes to the original image.

### 3. Message Extraction
The application reads the image pixel data, extracts the embedded bits and reconstructs the hidden message.

### 4. Decryption
The extracted encrypted message is decrypted using AES to retrieve the original text.

## Application Workflow

1. Enter the text message.
2. Encrypt the message using AES.
3. Select an image to use as the carrier.
4. Embed the encrypted message into the image using LSB steganography.
5. Extract the hidden data from the resulting image.
6. Decrypt the extracted message to recover the original text.

## Key Concepts Demonstrated

- Image Steganography
- Least Significant Bit (LSB) Encoding
- AES Cryptography
- Data Confidentiality
- Image Processing
- Pixel Manipulation using Canvas API

## Future Improvements

- Support for different image formats.
- Password-based encryption key management.
- Message integrity verification.
- Improved payload capacity and error handling.

## Author

**Prerona Som**
