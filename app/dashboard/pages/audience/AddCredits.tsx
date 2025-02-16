import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const AddCredits: React.FC = () => {
    const creditOption = [
        {
            credits: 30,
            amount: 19.99
        },
        {
            credits: 60,
            amount: 49.99
        },
        {
            credits: 120,
            amount: 99.99
        }
    ];

    const [selectedOption, setSelectedOption] = useState<{ credits: number; amount: number } | null>(null);

    const handleSelectOption = (option: { credits: number; amount: number }) => {
        setSelectedOption(option);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold mb-4">Choose a Subscription Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {creditOption.map((option) => (
                    <div
                        key={option.credits}
                        className={`border p-4 rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${selectedOption?.credits === option.credits ? 'border-blue-500' : 'border-gray-300'}`}
                        onClick={() => handleSelectOption(option)}
                        tabIndex={0}
                        aria-label={`Select ${option.credits} credits for $${option.amount}`}
                        onKeyDown={(e) => e.key === 'Enter' && handleSelectOption(option)}
                    >
                        <h3 className="text-xl font-semibold">{option.credits} Credits</h3>
                        <p className="text-lg">${option.amount.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className='mt-20'>
                {selectedOption?.amount &&
                <PayPalButtons style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                    return actions?.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: 'USD',
                                    value: selectedOption.amount.toFixed(2)
                                }
                            }
                        ]
                    });
                }}
                />
                }
            </div>
        </div>
    );
};

export default AddCredits; 