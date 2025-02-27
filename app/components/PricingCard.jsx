import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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

  return (
    <div
      className="bg-zinc-800 rounded-lg min-w-full overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
      style={{
        background: "linear-gradient(90deg, rgba(32,0,36,1) 0%, rgba(83,67,148,1) 26%, rgba(21,65,186,1) 66%)"
      }}
    >
      <div className="flex mt-4 mb-8 text-white text-center text-5xl font-bold flex-col">
        <h4>{price.nickname}</h4>
        <p>{dynamicSubTitle(price)}</p>
        <h1>{price.lookup_key}</h1>
      </div>

      <div>
        <div className="flex flex-col items-center text-white font-bold justify-center pt-4">
            <h1 className="text-4xl font-bold">
              {(price.unit_amount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </h1>
            <h3>per month</h3>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="mt-10 mb-4 w-[75%] flex justify-center mx-10 rounded-lg border border-transparent bg-[RGBA(12,12,12,0.8)] text-opacity-40 backdrop-blur py-2 px-4 text-2xl font-semibold text-slate-300 line-through shadow-sm hover:bg-opacity-50 transition-all">
              Subscribe
            </button>
          </DialogTrigger>
          <DialogContent 
            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 text-white p-8 rounded-xl shadow-xl border border-purple-500"
          >
            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-extrabold">🚧 Pricing Coming Soon! 🚧</DialogTitle>
              <DialogDescription className="text-lg text-gray-300 mt-4">
                Our subscription plans are not yet available. Stay tuned for updates!
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex justify-center">
              <button 
                // <button className="mt-10 mb-4 w-[75%] flex justify-center mx-10 align-items align-content rounded-lg border border-transparent space-x- bg-[RGBA(12,12,12,0.8)] backdrop-blur py-2 px-4 text-2xl font-semibold text-slate-200 shadow-sm" onClick={handleSubscription}>

                className="bg-white text-indigo-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                onClick={() => console.log("Closed")}
              >
                Got it!
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default PricingCard
//
