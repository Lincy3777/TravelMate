"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";


type Props = {
  onChange: (value: string) => void;
  value: string;
};


function ImageUpload({ onChange, value }: Props) {


  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const response = await fetch(
        `/api/file?filename=${file.name}`,
        {
            method: 'POST',
            body: file,
        },
    );
      const newBlob = (await response.json());
      onChange(newBlob.url);
    },
    [onChange]
  );

  return (
    <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
      <label>
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden" 
        />
      </label>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <Image alt="Uploaded" fill style={{ objectFit: "cover" }} src={value} />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;

