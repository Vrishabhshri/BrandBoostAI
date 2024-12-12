import Image from "next/image"
// Update the import path to reference the public directory

const Hero = () => {
    return (
        <div>
            <Image 
                src="/assets/hero.png"
                alt="Hero"
                className="h-auto w-[95%] rounded-[15px]"
            />
        </div>
    );
};

export default Hero;
