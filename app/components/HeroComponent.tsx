import Image from "next/image"

export default function HeroComponent() {
  return (
    <div className="relative w-full h-[300px]">
      <Image
        src="/assets/hero.png"
        alt="Dashboard Preview"
        fill
        className="object-contain rounded-2xl"
        priority
      />
    </div>
  )
} 