import { useEffect, useState } from "react"
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const categories = ["Followers", "Engagements", "Impressions", "Reach", "Mentions"] as const;
const colors = ["#B786EB", "#3880F3", "#85DA88", "#ED974F", "#D25075"];

type Category = typeof categories[number];

interface DataPoint {
    name: string;
    fullDate: Date;
    dayLabel: number;
    [key: string]: string | number | Date; // Index signature for dynamic category values
}

// Generate mock data for a full year
const generateData = (): DataPoint[] => {
    const data: DataPoint[] = [];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 5; j++) { // 5 random days per month
            const day = Math.floor(Math.random() * 28) + 1; // Random day from 1 to 28
            const fullDate = new Date(2024, i, day);
            const monthLabel = fullDate.toLocaleString('default', { month: 'short' });
            const dayLabel = fullDate.getDate();

            const entry: DataPoint = { 
                name: monthLabel,
                fullDate,
                dayLabel
            };

            categories.forEach(category => {
                entry[category] = Math.floor(Math.random() * 100) + 10; // Random values between 10-100
            });

            data.push(entry);
        }
    }

    return data.sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime()); // Sort by full date
};

interface GraphProps {
    isChatOpen: boolean;
}

export default function Graph({ isChatOpen }: GraphProps) {
    const [activeTab, setActiveTab] = useState<string>("1Y");
    const tabs = ["1D", "1M", "1Y", "Max"] as const;
    const [chartData, setChartData] = useState<DataPoint[]>([]);

    const filteredData = (): DataPoint[] => {
        if (!chartData.length) return [];
    
        if (activeTab === "1D") {
            return chartData.slice(-1).map(item => ({
                ...item,
                name: `${item.name} ${item.dayLabel}`
            }));
        } else if (activeTab === "1M") {
            return chartData.slice(-5).map(item => ({
                ...item,
                name: `${item.name} ${item.dayLabel}`
            }));
        } else {
            return chartData.map(item => ({
                ...item,
                name: item.name
            }));
        }
    };

    useEffect(() => {
        setChartData(generateData());
    }, []);

    return (
        <div className='rounded-3xl w-full h-full overflow-hidden border-2 border-[#ffffff19] bg-[#ffffff19] p-5'>
            {/* Title */}
            <div className="text-white flex flex-col">
                <span className="font-medium">Social Media Performance</span>
                <span className="font-light">Key trends in metrics</span>
            </div>

            {/* Tabs */}
            <div className="relative mt-8 border-2 border-[#ffffff19] rounded-[0.5rem] w-[200px] h-[30px]
                            flex flex-row text-white justify-around items-center text-[0.8rem] gap-[1px] bg-[#ffffff19]">
                {/* Animated Highlight */}
                <motion.div 
                    className="absolute top-0 bottom-0 left-0 bg-white rounded-[0.5rem] z-0 shadow-md w-[50px] h-full"
                    initial={{ x: 0 }}
                    animate={{ x: tabs.indexOf(activeTab as typeof tabs[number]) * 49 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />

                {tabs.map((tab) => (
                    <span
                        key={tab}
                        className={`relative cursor-pointer h-full flex justify-center items-center w-1/4 px-1 z-10 transition-colors duration-300
                                    ${activeTab === tab ? "text-black" : "text-white"}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {/* Graph */}
            <div className="mt-4">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData()} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                        <XAxis 
                            dataKey="name" 
                            tick={{ fill: "white" }} 
                            axisLine={false} 
                            tickLine={false} 
                            interval={activeTab === "1Y" || activeTab === "Max" ? 4 : 0}
                        />
                        <YAxis domain={[0, 120]} ticks={[0, 30, 60, 90, 120]} tick={{ fill: "white" }} axisLine={false}/>
                        <CartesianGrid vertical={false} horizontal={true} strokeDasharray="3 3" stroke="#ffffff40" />
                        <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "5px", color: "white" }} />
                        {categories.map((category, index) => (
                            <Line 
                                key={category} 
                                type="monotone" 
                                dataKey={category} 
                                stroke={colors[index]} 
                                strokeWidth={2} 
                                dot={false} 
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-row justify-between mt-4 w-full">
                {categories.map((category, index) => (
                    <div key={category} className="flex items-center mx-8">
                        <div 
                            className={`rounded-full mr-2 bg-[${colors[index]}]`}
                            style={{ 
                                width: isChatOpen ? "8px" : "15px", 
                                height: isChatOpen ? "8px" : "15px" 
                            }} 
                        />
                        <span className={`text-white ${isChatOpen ? "text-[0.6rem]" : "text-[0.8rem]"}`}>{category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
