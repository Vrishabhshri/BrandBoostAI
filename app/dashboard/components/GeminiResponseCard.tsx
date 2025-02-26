"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function GeminiResponseCard() {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/gemini-response.json');
                if (!response.ok) throw new Error("Failed to fetch saved response");
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError("Error loading saved data");
                console.error(err);
            }
        };
        fetchData();
    }, []);

    if (error) return <p>{error}</p>;
    if (!data) return <p>Loading...</p>;

    return (
        <Card className="bg-zinc-800/50 border-0 p-4">
            <CardHeader>
                <h3 className="font-medium text-white">{data.title}</h3>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-zinc-400 mb-4">{data.description}</p>
                <p className="text-white">Followers: {data.social.followers}</p>
                <p className="text-white">Likes: {data.social.likes}</p>
                <p className="text-white">Tweets: {data.social.tweets}</p>
                <h4 className="text-white">Competitors:</h4>
                <ul>
                    {data.competitors.map((competitor: string, index: number) => (
                        <li key={index} className="text-zinc-300">{competitor}</li>
                    ))}
                </ul>
                <h4 className="text-white">Hashtags:</h4>
                <ul>
                    {data.hashtags.map((hashtag: string, index: number) => (
                        <li key={index} className="text-zinc-300">#{hashtag}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
} 