
export function getCroppedImage(imageSrc, pixelCrop) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const { width, height, x, y } = pixelCrop;
  
        canvas.width = width;
        canvas.height = height;
  
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
  
        // Convert the cropped image to a base64 URL
        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64Image = reader.result;
              resolve(base64Image);
            };
          },
          'image/jpeg', // Change format as needed
          1 // Image quality (0 to 1)
        );
      };
  
      image.onerror = (error) => {
        reject(error);
      };
    });
  }
  