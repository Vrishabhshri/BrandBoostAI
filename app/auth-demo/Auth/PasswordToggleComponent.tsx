"use client";

import * as React from "react";
import Eye from "../_components/Eye";
import EyeOff from "../_components/EyeOff";
import { Input } from "@/components/ui/input";

interface PasswordToggleComponentProps {
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const PasswordToggleComponent: React.FC<PasswordToggleComponentProps> = ({
    showPassword,
    setShowPassword,
    value,
    onChange,
    disabled
}) => {
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            {/* Password Input */}
            <Input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder="Enter your password"
                required
                disabled={disabled}
            />

            {/* Eye Icon Toggle Button */}
            <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute w-auto mb-4 p-0 top-[10px] right-[5rem] transform -translate-y-1/2"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOff /> : <Eye />}
            </button>
        </div>
    );
};

export default PasswordToggleComponent;
