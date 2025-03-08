import { useState } from "react";

/**
 * useLoading - A custom hook to manage loading states
 * 
 * @returns {object} - loading state, startLoading, stopLoading
 */
export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const toggleLoading = () => setLoading((prev) => !prev);

  return { loading, startLoading, stopLoading, toggleLoading };
};
