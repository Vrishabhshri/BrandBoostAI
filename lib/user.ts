
// export const getUserCredits = async (userId: string) => {
//   const user = await db.user.findUnique({ where: { id: userId } });
//   return user?.credits || 0; // Ensure 'credits' is a valid field in your user model
// };

// export const deductUserCredit = async (userId: string) => {
//   await db.user.update({
//     where: { id: userId },
//     data: { credits: { decrement: 1 } },
//   });
// }; 