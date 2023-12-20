/*
Function: splitExpensesToUsers()
    Input: 
    userIds = [1,2]
    totalAmount = 100
    currentUserId = 3

    
    Output format:
    [
        {
            userId: 1,
            amount: 33
        },
        {
            userId: 2,
            amount: 33
        },
        {
            userId: 3,
            amount: 34
        },
    ]

*/
export const splitExpensesToUsers = (userIds, totalAmount, currentUserId) => {
  const totalUsers = userIds.length + 1 // including current user

  const splitAmountForEachUser = parseInt(totalAmount / totalUsers)

  const splitAmountForAdminUser =
    totalAmount - splitAmountForEachUser * userIds.length // extra amount is added to user who create the expense

  const result = userIds.map((userId) => ({
    userId,
    amount: splitAmountForEachUser,
  }))

  result.push({ userId: currentUserId, amount: splitAmountForAdminUser })

  return result
}
