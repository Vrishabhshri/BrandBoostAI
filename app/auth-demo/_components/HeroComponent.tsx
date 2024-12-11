import Image from "next/image"
// Update the import path to reference the public directory
import hero from "@/public/assets/hero.png";

const Hero = () => {
    return (
        <div>
            <Image 
                src={hero} 
                alt="Hero"
                className="h-auto w-[95%] rounded-[15px]"
            />
        </div>
    );
};

export default Hero;
