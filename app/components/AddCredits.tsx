import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const subscriptionPlans = [
    { name: 'Basic', amount: 20 },
    { name: 'Pro', amount: 100 },
    { name: 'Business', amount: 500 },
];

const AddCredits: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<{ name: string; amount: number } | null>(null);

    const handleSelect = (plan: { name: string; amount: number }) => {
        setSelectedOption(plan);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold mb-4">Choose a Subscription Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subscriptionPlans.map((plan) => (
                    <div
                        key={plan.name}
                        className="border rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelect(plan)}
                    >
                        <h3 className="text-xl">{plan.name}</h3>
                        <p className="text-lg">${plan.amount}</p>
                    </div>
                ))}
            </div>
            {selectedOption && (
                <div className="mt-4">
                    <PayPalButtons
                        style={{ layout: "horizontal" }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [{
                                    amount: {
                                        currency_code: "USD",
                                        value: selectedOption.amount.toFixed(2),
                                    },
                                }],
                            });
                        }}
                        onApprove={async (data, actions) => {
                            if (!actions.order) {
                                console.error('Order actions are undefined');
                                return;
                            }
                            const order = await actions.order.capture();
                            console.log('Order captured:', order);
                            // Handle successful payment here
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default AddCredits; 