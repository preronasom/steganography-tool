import React from "react";

export const ImageCanvas = ({ imageDataUrl, onLoad }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageDataUrl;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      onLoad(img, ctx);
    };
  }, [imageDataUrl, onLoad]);

  return <canvas ref={canvasRef} style={{ display: "none" }} />;
};
