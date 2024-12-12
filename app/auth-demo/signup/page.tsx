"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Check, X, AlertCircle } from 'lucide-react';

// Hardcoded allowed users
const allowedUsers = [
    { firstName: 'Daniel', lastName: 'H', email: 'daniel.h@amazon.com', business: 'Amazon', password: 'Amazon123' },
    { firstName: 'Mohamed', lastName: 'D', email: 'mohamed.d@amazon.com', business: 'Amazon', password: 'Amazon123' },
    { firstName: 'Karthik', lastName: 'Jeevanige', email: 'jsrkarthik@gmail.com', business: 'Target', password: 'Target123' },
    { firstName: 'Haris', lastName: 'M', email: 'haris.m@amazon.com', business: 'Amazon', password: 'Amazon123' },
    { firstName: 'Joeson', lastName: 'Stanes', email: 'joeson.s@target.com', business: 'Target', password: 'Target123' },
    { firstName: 'Shivani', lastName: 'Tumburu', email: 'shivani.t@amazon.com', business: 'Amazon', password: 'Amazon123' },
    { firstName: 'Kay', lastName: 'Monnette', email: 'kay.m@target.com', business: 'Target', password: 'Target123' },
    { firstName: 'Sarath', lastName: 'K', email: 'sarath.k@amazon.com', business: 'Amazon', password: 'Amazon123' },
    { firstName: 'Sheryl', lastName: 'Liu', email: 'sheryl.l@amazon.com', business: 'Amazon', password: 'Amazon123' }
];

const SignupForm: React.FC = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        business: '',
        password: '',
    });

    const { firstName, lastName, email, business, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if user exists in allowed users
        const userExists = allowedUsers.find(user => 
            user.email.toLowerCase() === email.toLowerCase() &&
            user.firstName.toLowerCase() === firstName.toLowerCase() &&
            user.lastName.toLowerCase() === lastName.toLowerCase() &&
            user.business.toLowerCase() === business.toLowerCase()
        );

        if (userExists) {
            // Check if password matches
            if (password === userExists.password) {
                toast.success('Welcome to Brandboost.ai!', {
                    duration: 3000,
                    icon: <Check className="w-4 h-4 text-green-500" />,
                    description: 'Your account has been successfully created. Redirecting to login...',
                    className: 'bg-white border border-gray-100 shadow-lg',
                });
                setTimeout(() => {
                    router.push('/auth-demo/login');
                }, 2000);
            } else {
                toast.error('Authentication Failed', {
                    duration: 4000,
                    icon: <X className="w-4 h-4 text-red-500" />,
                    description: 'The password you entered is incorrect. Please try again.',
                    className: 'bg-white border border-gray-100 shadow-lg',
                });
            }
        } else {
            toast.error('Account Not Found', {
                duration: 4000,
                icon: <AlertCircle className="w-4 h-4 text-amber-500" />,
                description: 'We couldn\'t find an account with these details. Please verify your information.',
                className: 'bg-white border border-gray-100 shadow-lg',
            });
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
            {/* Main Container Box */}
            <div className="flex w-full max-w-[900px] h-[600px] bg-white rounded-[32px] overflow-hidden">
                {/* Left Section with Illustration */}
                <div className="w-1/2 bg-white p-8 flex flex-col">
                    <div className="flex items-center gap-2">
                        <Image 
                            src="/assets/icons/Logo.svg" 
                            alt="Brandboost.ai" 
                            width={20} 
                            height={20} 
                        />
                        <span className="font-medium text-sm">Brandboost.ai</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="bg-[#F8F9FF] rounded-2xl p-4 mb-6 w-[320px] h-[320px] flex items-center justify-center">
                            <Image
                                src="/assets/hero.png"
                                alt="Workspace Illustration"
                                width={280}
                                height={280}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-sm text-gray-800 max-w-[280px] text-center leading-snug">
                            Unlock AI powered insights, strategy recommendations, and competitive analysis
                        </p>
                    </div>
                </div>

                {/* Right Section with Form */}
                <div className="w-1/2 bg-[#F7F7F7] p-8 flex flex-col">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 text-sm"
                    >
                        <span>←</span> Go back
                    </button>

                    <div className="flex-1 flex flex-col justify-center w-full">
                        <h1 className="text-2xl font-semibold mb-6">Enter your info</h1>
                        
                        <form onSubmit={onSubmit} className="space-y-3 w-full">
                            <Input
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={onChange}
                                placeholder="First name"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-white border-0 text-sm"
                            />

                            <Input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={onChange}
                                placeholder="Last name"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-white border-0 text-sm"
                            />

                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Business email"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-white border-0 text-sm"
                            />

                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-white border-0 text-sm"
                            />

                            <Button
                                type="submit"
                                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm mt-2"
                            >
                                Get started
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
