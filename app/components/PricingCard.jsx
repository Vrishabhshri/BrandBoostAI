import axios from "axios"

const PricingCard = ({ price }) => {

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
    <div
      className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
      style={{
        background: "linear-gradient(90deg, rgba(32,0,36,1) 0%, rgba(83,67,148,1) 26%, rgba(21,65,186,1) 66%)"
      }}
    >
      <div className="flex mt-4 mb-10 text-white text-center text-5xl font-bold flex-col">
          <h4>{price.nickname}</h4>
          <p>{dynamicSubTitle(price)}</p>
          <h1>{price.lookup_key}</h1>
        </div>
        <div>
          <div className="flex flex-col items-center text-white font-bold justify-center pt-4">
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
          <button className="mt-10 mb-4 w-[75%] flex justify-center mx-10 align-items align-content rounded-lg border border-transparent bg-[RGBA(12,12,12,0.8)] backdrop-blur py-2 px-4 text-2xl font-bold text-white shadow-sm" onClick={handleSubscription}>
            Subscribe
          </button>
        </div>
    </div>
  )
}

export default PricingCard
