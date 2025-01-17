'use client';

import Image from "next/image";

interface AvatarProps{
    src: string | null | undefined;
};

const Avatar: React.FC<AvatarProps>= ({
    src
}) => {
    return(
       <Image className="rounded-full" 
       height="30" width="30" alt="Profile" 
       src={src || "/images/profile.png"} />
    );
}
export default Avatar;