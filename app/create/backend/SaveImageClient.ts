export const saveImageClient = async (imageData) => {
    try {
      const response = await fetch('/api/saveImageData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save image data');
      }
  
      const result = await response.json();
      console.log("Image data successfully saved to the database.", result);
      return result;
    } catch (error) {
      console.error("Error saving image data to the database:", error);
    }
  };
  