import { db } from "@/lib/db"; // Assuming you have a database connection setup

export const getUserCredits = async (userId: string) => {
  const user = await db.user.findUnique({ where: { id: userId } });
  return user?.credits || 0;
};

export const deductUserCredit = async (userId: string) => {
  await db.user.update({
    where: { id: userId },
    data: { credits: { decrement: 1 } },
  });
}; 