'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Provider } from "@supabase/supabase-js";

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleSocialLogin = async (provider: Provider) => {
    try {
      console.log(`Attempting to login with ${provider}`);

      const options: {
        redirectTo: string;
        queryParams?: { [key: string]: string };
      } = {
        redirectTo: `/dashboard`,
      };

      if (provider === "google") {
        options.queryParams = {
          access_type: "offline",
          prompt: "consent",
        };
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options,
      });

      if (error) {
        console.error("Auth error:", error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Connecting to " + provider,
          description: "Please wait while we connect your account...",
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Failed to connect to provider",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black opacity-90 text-white p-4">
      <Card className="w-full bg-gray-800 max-w-md border border-gray-700 shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-white">Add your Social Media</CardTitle>
          <CardDescription className="text-gray-400">Link your accounts to get the best experience!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 border border-gray-600"
            onClick={() => handleSocialLogin("facebook")}
          >
            <Facebook className="h-5 w-5 text-blue-500" />
            Continue with Facebook
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 border border-gray-600"
            onClick={() => handleSocialLogin("twitter")}
          >
            <Twitter className="h-5 w-5 text-sky-400" />
            Continue with Twitter
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 border border-gray-600"
            onClick={() => handleSocialLogin("google")}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
