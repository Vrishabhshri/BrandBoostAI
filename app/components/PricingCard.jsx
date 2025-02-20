import axios from "axios"
import Link from "next/link"
import {AiFillCheckCircle} from 'react-icons/ai'

const PricingCard = ({price}) => {

const dynamicSubTitle = (price) => {
  if (price.nickname === "Basic") {
    return <p className="text-[#f1592a] mt-1">$20.00 Basic Plan</p>;
  } else if (price.nickname === "Plus") {
    return <p className="text-[#f1592a] mt-1">$100.00 Plus Plan</p>;
  } else if (price.nickname === "Pro") {
    return <p className="text-[#f1592a] mt-1">$500.00 Pro Plan</p>;
  }
}

// POST request 
const handleSubscription = async (e) => {
  e.preventDefault();
  const { data } = await axios.post('/api/payment',
  {
    priceId: price.id
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
  );
  window.location.assign(data)
}

  return (
    <div className="border-gray-800 shadow-2xl border-4 border-black rounded-2xl text-center mt-4 max-w-[480px]">
       <div className="flex flex-col">
        <div className="bg-gray-400 w-full h-28 items-center rounded-xl text-5xl font-bold text-center p-4">
           <h4 className="text-2xl">{price.nickname}</h4>
           <p>{dynamicSubTitle(price)}</p>
           <h1>{price.lookup_key}</h1>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center pt-4">
              <h1 className="text-3xl font-bold"> 
              {(price.unit_amount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
              </h1>
              <h3>per month</h3>
          </div>
          <ul className="flex justify-center">
              {/* <li className="text-xl font-bold" >{dynamicDescription(price)}</li> */}
          </ul>
          <button className="mt-8 flex w-full justify-center rounded-xl border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm" onClick={handleSubscription}>
             Subscribe
          </button>
        </div>
       </div>
    </div>
  )
}

export default PricingCard