const policySerializer = () => {
  return {
    toRequest: (payload) => {
      return {
        _id: payload._id,
        dateOfPurchase: payload.dateOfPurchase,
        customerId: payload.customerId,
        fuel: payload.fuel,
        vehicleSegment: payload.vehicleSegment,
        premium: payload.premium,
        bodilyInjuryLiability: payload.bodilyInjuryLiability,
        personalInjuryProtection: payload.personalInjuryProtection,
        propertyDamageLiability: payload.propertyDamageLiability,
        collision: payload.collision,
        comprehensive: payload.comprehensive,
        customerGender: payload.customerGender,
        customerIncomeGroup: payload.customerIncomeGroup,
        customerRegion: payload.customerRegion,
        customerMaritalStatus: payload.customerMaritalStatus,
      }
    }
  }
}

module.exports = {
  policySerializer
}