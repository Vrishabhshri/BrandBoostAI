import Link from "next/link";
import Image from 'next/image';

export default function NavHeader() {

    return (

        <div className={`flex flex-row justify-start items-center
            padding-0
            backdrop-blur-2xl shadow-2xl
            bg-[#d9d9d940]
            text-white`}>

            {/* Flame icon */}
            <Image 
            src="/assets/icons/flame.svg" 
            className="m-3"
            alt='flame image'
            width={30}
            height={30}
            />

            {/* Nav categories */}
            <div className={`
                            flex flex-row items-center
                            h-10 ml-10 gap-4
                            `}>

                {/* Overview Link */}
                <Link href="/dashboard" className={`
                                text-[15px]
                                flex flex-row items-center justify-center
                                hover:text-[#ffffff80]
                                cursor-pointer`}>

                    <Image
                    src={'/assets/icons/Book.svg'}
                    alt='book user icon'
                    width={15}
                    height={15}
                    />
                    <span className='ml-1 mr-1'>Overview</span>

                </Link>

                {/* Competitor Dashboard Link */}
                <Link href="/dashboard/competitor" className={`
                                text-[15px]
                                flex flex-row items-center justify-center
                                hover:text-[#ffffff80]
                                cursor-pointer`}>

                    <Image
                    src={'/assets/icons/ChessRook.svg'}
                    alt='chess rook icon'
                    width={15}
                    height={15}
                    />
                    <span className='ml-1 mr-1'>Competitor Dashboard</span>

                </Link>

                {/* Content Builder Link */}
                <Link href="/dashboard/Content-Builder" className={`
                                text-[15px]
                                flex flex-row items-center justify-center
                                hover:text-[#ffffff80]
                                cursor-pointer`}>

                    <Image
                    src={'/assets/icons/Magic.svg'}
                    alt='magic icon'
                    width={15}
                    height={15}
                    />
                    <span className='ml-1 mr-1'>Content Builder</span>

                </Link>

                {/* Settings Link */}
                <Link href="/" className={`
                                text-[15px]
                                flex flex-row items-center justify-center
                                hover:text-[#ffffff80]
                                cursor-pointer`}>

                    <Image
                    src={'/assets/icons/Cog.svg'}
                    alt='settings icon'
                    width={15}
                    height={15}
                    />
                    <span className='ml-1 mr-1'>Settings</span>

                </Link>

            </div>

        </div>

    );

}