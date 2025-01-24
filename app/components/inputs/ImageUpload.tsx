// "use client";

// import { CldUploadWidget } from "next-cloudinary";
// import Image from "next/image";
// import React, { useCallback } from "react";
// import { TbPhotoPlus } from "react-icons/tb";

// declare global {
//   var cloudinary: any;
// }

// type Props = {
//   onChange: (value: string) => void;
//   value: string;
// };

// function ImageUpload({ onChange, value }: Props) {
//   const handleCallback = useCallback((result: any) => {
//     console.log('Uploaded URL:', result.info.secure_url);
//     onChange(result.info.secure_url);
//   }, [onChange]);  

//   return (
//     <CldUploadWidget
//       onUploadAdded={handleCallback}
//       uploadPreset="travel"
//       options={{
//         maxFiles: 1, 
//       }}
//     >
//       {({ open }) => {
//         return (
//           <div
//             onClick={() => open?.()}
//             className=" relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
//           >
//             <TbPhotoPlus size={70} />
//             <div className="font-semibold text-lg">Click to upload</div>
//             {value && (
//               <div className=" absolute inset-0 w-full h-full">
//                 <Image
//                   alt="uploade"
//                   fill
//                   style={{ objectFit: "cover" }}
//                   src={value}
//                 />
//               </div>
//             )}
            
//           </div>
//         );
//       }}
//     </CldUploadWidget>
//   );
// }

// export default ImageUpload;

"use client";

import React, { useCallback } from "react";
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

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed.");
        }

        const data = await response.json();
        onChange(data.url); // URL returned from Vercel Blob
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    [onChange]
  );

  return (
    <div
      className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
    >
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
          <Image
            alt="Uploaded"
            fill
            style={{ objectFit: "cover" }}
            src={value}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;



