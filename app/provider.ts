"use client";
import React, { useEffect } from "react";
import { eq } from "drizzle-orm";
import { db } from "../configs/db";
import { USER_TABLE } from "../configs/schema";
import { useUser } from "@clerk/nextjs";

interface ProviderProps {
    children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            CheckINewUser();
        }
    }, [user]);

    const CheckINewUser = async () => {
        const result = await db
            .select()
            .from(USER_TABLE)
            .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
        console.log(result);

        if (result?.length === 0) {
            const userResponse = await db
                .insert(USER_TABLE)
                .values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress,
                    business: "default business", // Default value for "business"
                })
                .returning({ id: USER_TABLE.id });

            console.log(userResponse);
        }
    };

    return <div>{children}</div>;
}

export default Provider;
