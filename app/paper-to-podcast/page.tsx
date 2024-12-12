"use client";
import { Button } from "@nextui-org/react";
import { useRef, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";

export default function PaperToPodcastPage() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files ?? [];

    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <div className="p-4 my-4 ">
      <div className="bg-gray-200 pb-16 rounded-lg p-4 flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-center mb-2">
          Paper to Podcast ✨
        </h1>
        <p className="text-center py-2">
          Upload a paper to convert to podcast! 🚀
        </p>
        <div className="flex justify-center w-full">
          <Button
            onPress={onUploadClick}
            size="lg"
            variant="solid"
            color="primary"
            className="w-1/2"
            startContent={<IoMdCloudUpload data-testid="fa-upload" size={20} />}
          >
            Upload Paper
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </Button>
        </div>
        {file && (
          <div className="flex justify-center">
            <div className="p-2 mt-2 text-xs text-center w-1/2">
              <div className="flex justify-center items-center bg-gray-800 text-white p-4 rounded-lg">
                <FaFileAlt data-testid="fa-file-alt" size={20} />
                <p>{file.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
