"use client";

import * as React from "react";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from "sonner";

// This would typically come from your backend/database
const VALID_ACCOUNTS = [
    { email: 'kaymone@gmail.com', password: 'password123' },
    // Add more test accounts as needed
];

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('kaymone@gmail.com');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error("Please enter a valid email address", {
                    style: {
                        background: '#FEE2E2',
                        border: '1px solid #FCA5A5',
                        color: '#DC2626',
                    },
                    icon: '⚠️'
                });
                setLoading(false);
                return;
            }

            // Validate password
            if (password.length < 6) {
                toast.error("Password must be at least 6 characters", {
                    style: {
                        background: '#FEE2E2',
                        border: '1px solid #FCA5A5',
                        color: '#DC2626',
                    },
                    icon: '⚠️'
                });
                setLoading(false);
                return;
            }

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if account exists and credentials match
            const account = VALID_ACCOUNTS.find(acc => 
                acc.email === email && acc.password === password
            );

            if (account) {
                // Success: Save auth state and redirect
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', email);
                
                toast.success("Login successful! Redirecting...", {
                    style: {
                        background: '#DEF7EC',
                        border: '1px solid #84E1BC',
                        color: '#03543F',
                    },
                    icon: '✅',
                    duration: 2000,
                });
                
                // Delay redirect slightly to show the success message
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            } else {
                toast.error("Invalid email or password", {
                    style: {
                        background: '#FEE2E2',
                        border: '1px solid #FCA5A5',
                        color: '#DC2626',
                    },
                    icon: '❌',
                    description: "Please check your credentials and try again."
                });
            }
        } catch (error) {
            toast.error("An error occurred", {
                style: {
                    background: '#FEE2E2',
                    border: '1px solid #FCA5A5',
                    color: '#DC2626',
                },
                icon: '⚠️',
                description: "Please try again later."
            });
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#2D3748] items-center justify-center">
            <div className="w-[1000px] h-[600px] bg-white rounded-[40px] flex overflow-hidden">
                {/* Left Column */}
                <div className="w-1/2 bg-white p-8 flex flex-col">
                    <div>
                        <div className="flex items-center gap-2">
                            <Image 
                                src="/assets/icons/Logo.svg" 
                                alt="Brandboostr.us" 
                                width={20} 
                                height={20}
                            />
                            <span className="font-medium">Brandboostr.us</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-[380px] h-[380px] relative mb-6">
                            <Image
                                src="/assets/hero.png"
                                alt="Login illustration"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        
                        <p className="text-[#4A5568] text-[15px] max-w-[300px] text-center">
                            Unlock AI powered insights, strategy recommendations, and competitive analysis
                        </p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-1/2 bg-[#F7F7F7] p-8 flex flex-col">
                    <Link 
                        href="/"
                        className="inline-flex items-center text-sm text-[#4A5568] mb-10"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Go back
                    </Link>

                    <div className="flex-1 flex flex-col justify-center max-w-[300px]">
                        <h1 className="text-[28px] font-semibold text-gray-900 mb-8">Welcome back!</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full h-12 px-4 rounded-lg bg-white border border-[#E2E8F0] text-sm"
                                required
                            />

                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full h-12 px-4 rounded-lg bg-white border border-[#E2E8F0] text-sm"
                                required
                            />

                            <Button
                                type="submit"
                                className="w-full h-12 bg-[#4A5568] hover:bg-[#2D3748] text-white font-medium rounded-lg"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;