import { useState } from "react";
import UploadReceipt from "./UploadReceipt";

type ReceiptData = {
  merchant: string;
  total_amount: number;
  date: string;
};

function ReceiptScanner() {
  const [data, setData] = useState<ReceiptData | null>(null);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:8080/api/receipts/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result: ReceiptData = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="p-4">
      <UploadReceipt onImageUpload={handleImageUpload} />
      {data && (
        <div className="mt-4 border p-2">
          <p>
            <strong>Трговец:</strong> {data.merchant}
          </p>
          <p>
            <strong>Сума:</strong> {data.total_amount} ден.
          </p>
          <p>
            <strong>Датум:</strong> {data.date}
          </p>
        </div>
      )}
    </div>
  );
}

export default ReceiptScanner;
