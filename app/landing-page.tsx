"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Meteors } from "@/components/ui/meteors"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, Zap, Shield, Sparkles, Play } from 'lucide-react'
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlowingStars } from "@/components/ui/glowing-stars"
import { FloatingNavDemo } from "@/components/ui/floating-navbar"
import { useRouter } from 'next/navigation'
import axios from 'axios';
import PricingCard from "./components/PricingCard";

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const [activeTab, setActiveTab] = useState("overview")
  const [isClient, setIsClient] = useState(false)
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [loading, setLoading] = useState(false)
    const [prices, setPrices] = React.useState<Price[]>([]);

  // Useful variables
  const router = useRouter()

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "demo", "testimonials", "pricing"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveTab(currentSection);
    };

    if (isClient) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isClient]);

  const getStartedClick = () => {

    setLoading(true)
    router.push('/dashboard')
  }


interface Price {
  id: string;
}

  // Fetch subscription prices
  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data } = await axios.get("/api/getproducts");
    setPrices(data);
  };

  return (
    <div className="relative">
      <GlowingStars />
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden">
        <FloatingNavDemo navItems={[
          {
            name: "Features",
            link: "#features",
          },
          {
            name: "Demo",
            link: "#demo",
          },
          {
            name: "Testimonials",
            link: "#testimonials",
          },
          {
            name: "Pricing",
            link: "#pricing",
          },
        ]} />

        <main>
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <Meteors number={20} />
            <motion.div 
              className="container mx-auto px-4 text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -10 }}
              transition={{ duration: 1.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Supercharge Your Social Media Strategy
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-zinc-300 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Harness the power of AI to boost your brand's presence, engage your audience, and stay ahead of the competition.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button 
                  onClick={getStartedClick} 
                  disabled={loading}
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? "Preparing..." : <>Get Started <ArrowRight className="ml-2 h-5 w-5" /></>}
                </Button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
              style={{ y }}
            />
          </section>

          <section id="features" className="py-20 bg-zinc-900">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Powerful Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: BarChart2, title: "Advanced Analytics", description: "Gain deep insights into your social media performance with our cutting-edge analytics tools." },
                  { icon: Zap, title: "AI-Powered Content", description: "Generate engaging content tailored to your brand voice and audience preferences." },
                  { icon: Shield, title: "Competitor Analysis", description: "Stay ahead of the game by tracking and analyzing your competitors' strategies." },
                  { icon: Sparkles, title: "Trend Prediction", description: "Leverage AI to predict upcoming trends and stay ahead of the curve." },
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <feature.icon className="h-12 w-12 mb-4 text-blue-500" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="demo" className="py-20 bg-gradient-to-b from-zinc-900 to-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                See BrandBoost.ai in Action
              </h2>
              <motion.div 
                className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 z-10"></div>
                <img 
                  src="/assets/hero.png"
                  alt="BrandBoost.ai Dashboard Preview" 
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover aspect-video"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-200 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 z-20">
                    <Play className="mr-2 h-5 w-5" /> Watch Demo
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="testimonials" className="py-20 bg-zinc-900">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Sarah Johnson", role: "Marketing Director", company: "TechCorp", quote: "BrandBoost.ai has revolutionized our social media strategy. The AI-powered insights are invaluable!" },
                  { name: "Michael Chen", role: "Social Media Manager", company: "FashionNova", quote: "The competitor analysis feature has given us a significant edge in our industry. Highly recommended!" },
                  { name: "Emily Rodriguez", role: "CEO", company: "StartupX", quote: "As a startup, BrandBoost.ai has been a game-changer for us. It's like having an entire marketing team at our fingertips." },
                ].map((testimonial, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-zinc-300 mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name[0]}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-zinc-400">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

            {/* Pricing Section Updated */}
          <section id="pricing" className="py-20 bg-zinc-900">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Choose Your Plan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-opacity-30 p-6 rounded-lg max-w-7xl mx-auto">
                {prices.length > 0 ? (
                  prices.map((price) => (
                    <PricingCard price={price} key={price.id} />
                  ))
                ) : (
                  <p className="text-center text-zinc-400">Loading plans...</p>
                )}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-zinc-900 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Case Studies</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="./privacy-policy" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">API Docs</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Twitter</Link></li>
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">LinkedIn</Link></li>
                  <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Facebook</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-400">
              <p>&copy; 2024 BrandBoost.ai. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}