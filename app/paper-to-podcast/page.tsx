"use client";
import { Button } from "@nextui-org/react";
import { useRef } from "react";

export default function PaperToPodcastPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  return (
    <div className="p-4 m-4">
      <div className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center">
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
          >
            Upload Paper
            <input ref={inputRef} type="file" className="hidden" />
          </Button>
        </div>
      </div>
    </div>
  );
}
