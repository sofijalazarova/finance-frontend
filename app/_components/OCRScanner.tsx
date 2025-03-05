import { useState } from "react";
import Tesseract from "tesseract.js";

const OCRScanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      extractTextFromImage(file);
    }
  };

  const extractTextFromImage = async (file: File) => {
    try {
      const { data } = await Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m),
      });
      setExtractedText(data.text);
    } catch (error) {
      console.error("OCRD ERROR", error);
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" className="mt-4 w-60" />}
      <textarea
        className="mt-4 w-full h-32 border"
        value={extractedText}
        readOnly
      />
    </div>
  );
};

export default OCRScanner;
