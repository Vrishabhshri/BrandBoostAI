import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy for BrandBoostrAI</h1>
          <p className="text-sm text-gray-600 mb-4">Effective Date: 01/01/2025</p>
          
          <div className="prose prose-sm max-w-none text-gray-500">
            <p>BrandBoostrAI ("we," "our," "us") values the privacy of its users and is committed to protecting the personal information that users share with us. This Privacy Policy outlines how we collect, use, and protect your information when you access our services, including our website at www.brandboostr.us (the "Site").</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Information We Collect</h2>
            <p>We collect the following types of information:</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">A. Personal Information:</h3>
            <p>When you sign up for BrandBoostrAI or interact with our platform, we may collect personal information, including but not limited to:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Business name and/or social media handles</li>
              <li>Profile information (e.g., social media profiles, user preferences)</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">B. Non-Personal Information:</h3>
            <p>We may collect non-personal information to improve the user experience, including:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>IP address</li>
              <li>Location data</li>
              <li>Usage data (e.g., which features are used, frequency of use)</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How We Use Your Information</h2>
            <p>We use the information we collect in the following ways:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>To provide, operate, and maintain BrandBoostrAI services</li>
              <li>To personalize content and recommendations based on your preferences</li>
              <li>To communicate with you regarding updates, new features, and support</li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-between items-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href="/assets/BrandBoostrAI_PrivacyPolicy.pdf" target="_blank" rel="noopener noreferrer">
            <Button>Download PDF</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

