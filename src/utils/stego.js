// Function to encode a message into an image
export const encodeMessage = (imageDataUrl, message) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageDataUrl;

    return new Promise((resolve) => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            const binaryMessage = message
                .split('')
                .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
                .join('') + '00000000'; // Null terminator

            let index = 0;
            for (let i = 0; i < imgData.data.length; i += 4) {
                if (index >= binaryMessage.length) break;
                imgData.data[i] = (imgData.data[i] & 0xfe) | parseInt(binaryMessage[index]);
                index++;
            }

            ctx.putImageData(imgData, 0, 0);
            resolve(canvas.toDataURL());
        };
    });
};

// Function to decode the message from an image
export const decodeMessage = (imageDataUrl) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageDataUrl;

    return new Promise((resolve) => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            let binary = '';
            for (let i = 0; i < imgData.data.length; i += 4) {
                binary += (imgData.data[i] & 1).toString();
            }

            let message = '';
            for (let i = 0; i < binary.length; i += 8) {
                const byte = binary.slice(i, i + 8);
                if (byte === '00000000') break;
                message += String.fromCharCode(parseInt(byte, 2));
            }

            resolve(message);
        };
    });
};
