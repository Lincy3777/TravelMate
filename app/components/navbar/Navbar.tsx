'use client';

import { Session } from "next-auth";
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./search";
import TabSearch from "./TabSearch";
import UserMenu from "./UserMenu";
import { safeUser } from "@/app/types";

interface NavbarProps {
    session?: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({
    session
}) =>{
    return(
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <TabSearch />
                        <Search />
                        <UserMenu session={session} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
}
export default Navbar