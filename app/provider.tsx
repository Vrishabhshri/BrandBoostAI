"use client";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { db } from "../configs/db";
import { USER_TABLE } from "../configs/schema";
import { useUser } from "@clerk/nextjs";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface ProviderProps {
  children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
  const { user } = useUser();
  const [userCredits, setUserCredits] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      CheckINewUser();
    }
  }, [user]);

  const CheckINewUser = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      console.warn("User email is undefined.");
      return;
    }

    const result = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, email));
    
    if (result?.length > 0) {
      setUserCredits(result[0].credits);
    } else {
      const userResponse = await db
        .insert(USER_TABLE)
        .values({
          name: user?.fullName || "Unknown User",
          email,
          business: "default business",
        })
        .returning({ id: USER_TABLE.id });

      console.log(userResponse);
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAPPAL_Client_ID || '' }}>
      <div>{children}</div>
    </PayPalScriptProvider>
  )
}

export default Provider;
