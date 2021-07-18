const getSortedPurchaseDates = (policies) => {
  const purchaseDates = policies.map(policy => policy.dateOfPurchase.split('T')[0]);

  const sortedPurchaseDates = purchaseDates.sort((a,b) =>  
    a.split('-')[2] - b.split('-')[2])

  return sortedPurchaseDates;
}

const getPolicyCount = (purchaseDates) => {
  const policyCount = {}

  purchaseDates.forEach(purchaseDate => {
    if(!policyCount[purchaseDate]) {
      policyCount[purchaseDate] = 1
    } else {
      policyCount[purchaseDate] += 1
    }
  })

  return policyCount;
}

module.exports = {
  getSortedPurchaseDates,
  getPolicyCount
}