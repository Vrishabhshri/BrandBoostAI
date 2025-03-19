import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function NavHeader() {
    const navLinkClass = "text-[15px] flex flex-row items-center justify-center hover:text-[#ffffff80] cursor-pointer";

    return (
        <div className="flex flex-row justify-start items-center w-full backdrop-blur-2xl shadow-2xl bg-[#d9d9d940] text-white p-3">
            
            {/* Flame icon */}
            <Image 
                src="/assets/icons/flame.svg" 
                className="m-3"
                alt="Flame icon"
                width={30}
                height={30}
            />

            {/* Navigation Links */}
            <div className="flex flex-row items-center h-10 px-4 gap-4">
                <Link href="/dashboard" className={navLinkClass}>
                    <Image src="/assets/icons/Book.svg" alt="Overview icon" width={15} height={15} />
                    <span className="ml-1 mr-1">Overview</span>
                </Link>

                <Link href="/dashboard/competitor" className={navLinkClass}>
                    <Image src="/assets/icons/ChessRook.svg" alt="Competitor Dashboard icon" width={15} height={15} />
                    <span className="ml-1 mr-1">Competitor Dashboard</span>
                </Link>

                <Link href="/dashboard/ContentBuilder" className={navLinkClass}>
                    <Image src="/assets/icons/Magic.svg" alt="Content Builder icon" width={15} height={15} />
                    <span className="ml-1 mr-1">Content Builder</span>
                </Link>

                <Link href="/" className={navLinkClass}>
                    <Image src="/assets/icons/Cog.svg" alt="Settings icon" width={15} height={15} />
                    <span className="ml-1 mr-1">Settings</span>
                </Link>
            </div>

            {/* User Authentication - Aligned Right */}
            <div className="ml-auto p-3 h-auto rounded-lg cursor">
                <SignedOut>
                    <SignInButton mode="modal" />
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>

        </div>
    );
}
