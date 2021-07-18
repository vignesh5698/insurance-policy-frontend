const axios = require('axios');
const { getSortedPurchaseDates, getPolicyCount } = require('./helper');
const { policySerializer } = require('./policySerializer');

const BASEURL = 'http://3.138.140.199:5000'

class Datasource {
  async getPolicyData(searchFilter, searchPhrase) {
    if(!searchFilter || !searchPhrase) {
      return null;
    }

    const isFilteredByPolicy = searchFilter == 'policyId'
    const getPolicyUrl = `${BASEURL}/${isFilteredByPolicy ? 'policy' : 'customer'}/${searchPhrase}`

    const response = await axios.get(getPolicyUrl);
    return isFilteredByPolicy ? response.data : response.data[0];
  }

  async updatePolicy(policyId, payload) {
    const serializedPayload = policySerializer().toRequest(payload);
    const updatePolicyUrl = `${BASEURL}/policy/${policyId}`

    const response = await axios.put(updatePolicyUrl, serializedPayload);
    return response.data;
  }

  async filterPolicies(filter, subFilter) {
    const query = filter == 'monthly' ? `date=${subFilter}` : `region=${subFilter}`;
    const filterPolicyUrl = `${BASEURL}/filter-policy?${query}`
    const response = await axios.get(filterPolicyUrl);

    const policies = response.data
    const purchaseDates = getSortedPurchaseDates(policies)
    const policyCount = getPolicyCount(purchaseDates)

    return {
      policyDates: Object.keys(policyCount),
      counts: Object.values(policyCount)
    }
  }
}

export default Datasource;
