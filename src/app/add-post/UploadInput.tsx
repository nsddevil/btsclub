"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { ImagePlus } from "lucide-react";

export default function UploadInput() {
  const [images, setImages] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const imageUrls: string[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const url = URL.createObjectURL(files[i]);
        imageUrls.push(url);
      }
      setImages((prev) => [...prev, ...imageUrls]);
    }
  };
  const handleRemoveImg = (imgUrl: string) => {
    const filteredImgs = images.filter((img) => img !== imgUrl);
    setImages(filteredImgs);
    URL.revokeObjectURL(imgUrl);
  };

  useEffect(() => {
    return () => {
      images.forEach((item) => URL.revokeObjectURL(item));
    };
  }, [images]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {images.map((url) => (
          <div key={url} className="relative">
            <Image
              src={url}
              alt={url}
              width={100}
              height={100}
              className="w-auto"
            />
            <XCircle
              className="absolute -right-3 -top-5 h-12 w-12 cursor-pointer rounded-full bg-red-800 text-white"
              onClick={() => {
                handleRemoveImg(url);
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 inline-block cursor-pointer rounded border bg-secondary">
        <Label className="cursor-pointer">
          <ImagePlus className="h-20 w-20" />
          <Input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </Label>
      </div>
    </div>
  );
}
