"use client";
import { NavHeader } from "../components/nav-header"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { SignIn } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex flex-col p-6 bg-zinc-900">
      {/* <h1 className="text-2xl font-semibold text-white">Profile</h1>
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
      </form> */}

      <SignIn />

    </div>
  );
} 