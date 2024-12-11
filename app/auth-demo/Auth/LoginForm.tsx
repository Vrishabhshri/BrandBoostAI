"use client";

import * as React from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import PasswordToggleComponent from "./PasswordToggleComponent";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";

// Types
interface LoginFormProps {
  onSuccess?: () => void;
}

interface FormData {
  email: string;
  password: string;
}

// Constants
const ALLOWED_CREDENTIALS = [
  { email: "daniel.h@brandboostr.ai", password: "123456" },
  { email: "mohamed.d@brandboostr.ai", password: "123456" },
] as const;

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim(),
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      const isValidCredentials = ALLOWED_CREDENTIALS.some(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (!isValidCredentials) {
        throw new Error('Invalid credentials');
      }

      login(true);
      toast.success("Login successful!");
      
      // Allow time for toast to show
      setTimeout(() => {
        onSuccess?.();
        router.push('/Overview');
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 w-full" role="alert" aria-busy="true">
        <Skeleton className="w-full h-12 rounded-md" />
        <Skeleton className="w-full h-12 rounded-md" />
        <Skeleton className="w-full h-12 rounded-md" />
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 w-full"
      aria-label="Login form"
    >
      {error && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="w-full"
          aria-label="Email address"
          autoComplete="email"
          disabled={loading}
        />

        <div className="relative">
          <PasswordToggleComponent
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            value={formData.password}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-700 transition-colors"
          disabled={loading}
          aria-label={loading ? "Logging in..." : "Login"}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
