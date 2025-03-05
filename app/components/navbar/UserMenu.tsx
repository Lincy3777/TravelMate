'use client';
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { safeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import router from "next/router";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";


interface UserMenuProps{
    session?: Session | null
}

const UserMenu:React.FC<UserMenuProps> = ({
    session
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const rentModal  = useRentModal();

    const [isOpen, setIsOpen] = useState(false);
    
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);

    },[]);

    const onRent = useCallback(() =>{
        if(!session){
            return LoginModal.onOpen();
        }
        rentModal.onOpen();
    },[session, LoginModal, rentModal]);

    // const session = getCurrentUser();

    return(
       <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div onClick={onRent}
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-200 transition cursor-pointer">
                    your unique stay
            </div>
            <div onClick={toggleOpen}
            className="p-4 md:px-2 md:py-1 border-[1px] border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={session?.user.image} />
                    {/* <div className="bg-black text-white rounded-full border border-gray-300 overflow-hidden">
                        * <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg> 
                    </div> */}
                </div>
            </div>
        </div>
        {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                 {session ? (
                    <>
                    <MenuItem 
                    onClick={()=> router.push("/trips")} 
                    label="My trips"
                    />
                    <MenuItem 
                    onClick={()=> router.push("/favorites")}
                    label="My favorites"
                    />
                    <MenuItem 
                    onClick={()=> router.push("/reservations")}
                    label="My reservations"
                    />
                    <MenuItem 
                    onClick={()=> router.push("/properties")} 
                    label="My properties"
                    />
                    <MenuItem 
                    onClick={()=>{}} 
                    label="Personal assistant"
                    />
                    <MenuItem 
                    onClick={rentModal.onOpen} 
                    label="My stay"
                    />
                    <hr/>
                    <MenuItem 
                    onClick={()=> signOut()} 
                    label="Logout"
                    />
                  </>
                  ):(<>
                    <MenuItem 
                    onClick={LoginModal.onOpen} 
                    label="Login"
                    />
                    <MenuItem 
                    onClick={registerModal.onOpen}
                    label="Sign up"
                    />
                  </>)}
                  
                </div>
            </div>
        )}
       </div>
    );
}
export default UserMenu;

