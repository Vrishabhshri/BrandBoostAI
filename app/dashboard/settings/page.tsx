"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data from API or context
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user"); // Adjust the API endpoint as needed
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await fetch("/api/user/delete", { method: "DELETE" }); // Adjust the API endpoint as needed
        toast.success("Account deleted successfully");
        // Redirect or perform additional actions after deletion
      } catch (error) {
        toast.error("Failed to delete account");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-6 bg-zinc-900">
      <h1 className="text-2xl font-semibold text-white">Profile</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-white">Name</label>
          <Input value={name} onChange={handleNameChange} className="mt-1" />
        </div>
        <div className="mb-4">
          <label className="block text-white">Email</label>
          <Input value={email} onChange={handleEmailChange} className="mt-1" />
        </div>
        <Button type="submit" className="mr-2" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="destructive" onClick={handleDeleteAccount} disabled={loading}>
          Delete Account
        </Button>
      </form>
    </div>
  );
} 