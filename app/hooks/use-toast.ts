// import * as React from "react"

// type Toast = {
//   id: string
//   title?: React.ReactNode
//   description?: React.ReactNode
//   action?: React.ReactNode
//   open: boolean
// }

// const TOAST_LIMIT = 1
// const TOAST_REMOVE_DELAY = 10000

// let count = 0

// function genId() {
//   count = (count + 1) % Number.MAX_SAFE_INTEGER
//   return count.toString()
// }

// export const useToast = () => {
//   const [toasts, setToasts] = React.useState<Toast[]>([])

//   const addToast = (toast: Omit<Toast, "id" | "open">) => {
//     const id = genId()
//     const newToast = { ...toast, id, open: true }
//     setToasts((prev: Toast[]) => [...prev, newToast].slice(0, TOAST_LIMIT))

//     setTimeout(() => {
//       dismissToast(id)
//     }, TOAST_REMOVE_DELAY)
//   }

//   const dismissToast = (id: string) => {
//     setToasts((prev: Toast[]) => prev.map((t) => (t.id === id ? { ...t, open: false } : t)))
//   }

//   return {
//     toasts,
//     addToast,
//     dismissToast,
//   }
// }

// export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { toasts, addToast, dismissToast } = useToast()

//   return (
//     <>
//       {children}
//       <div className="fixed bottom-0 right-0 p-4">
//         {toasts.map((toast) => (
//           <div key={toast.id} className={`bg-gray-800 text-white p-4 rounded mb-2 ${toast.open ? 'block' : 'hidden'}`}>
//             <h4 className="font-bold">{toast.title}</h4>
//             <p>{toast.description}</p>
//             {toast.action && <div>{toast.action}</div>}
//             <button onClick={() => dismissToast(toast.id)} className="mt-2 text-blue-400">Dismiss</button>
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }
