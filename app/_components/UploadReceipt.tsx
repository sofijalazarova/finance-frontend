import Image from "next/image";
import { useState } from "react";

type UploadReceiptProps = {
  onImageUpload: (file: File) => void;
};

function UploadReceipt({ onImageUpload }: UploadReceiptProps) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      onImageUpload(file); // Испраќање кон backend
    }
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Receipt preview" className="mt-2 w-40" />}
    </div>
  );
}

export default UploadReceipt;
