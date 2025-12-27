 // Helper function: Calculate service overlap score
const calculateServiceOverlap = (projectServices, agencyServices) => {
  if (!projectServices || !agencyServices || projectServices.length === 0) {
    return 0;
  }

  // Count how many project services the agency offers
  const matchingServices = projectServices.filter(service =>
    agencyServices.includes(service)
  );

  // Score: 10 points per matching service
  return matchingServices.length * 10;
};

// Helper function: Calculate budget compatibility score
const calculateBudgetScore = (projectBudget, agencyBudget) => {
  const { budget_min: projectMin, budget_max: projectMax } = projectBudget;
  const { budget_min: agencyMin, budget_max: agencyMax } = agencyBudget;

  // Check if there's no budget data
  if (!projectMin || !projectMax || !agencyMin || !agencyMax) {
    return 0;
  }

  // Check if budgets overlap
  const hasOverlap = projectMax >= agencyMin && projectMin <= agencyMax;

  if (!hasOverlap) {
    return 0; // No overlap, no score
  }

  // Calculate overlap percentage
  const overlapMin = Math.max(projectMin, agencyMin);
  const overlapMax = Math.min(projectMax, agencyMax);
  const overlapRange = overlapMax - overlapMin;
  const projectRange = projectMax - projectMin;

  // Score: 0-20 points based on overlap percentage
  const overlapPercentage = overlapRange / projectRange;
  return Math.round(overlapPercentage * 20);
};

// Helper function: Get rating score
const getRatingScore = (agencyRating) => {
  if (!agencyRating) {
    return 0;
  }

  // Score: rating * 10 (e.g., 4.5 rating = 45 points)
  return agencyRating * 10;
};

// Helper function: Get premium boost
const getPremiumBoost = (subscriptionType) => {
  // Premium agencies get a 15-point boost
  return subscriptionType === 'premium' ? 15 : 0;
};

// Main function: Calculate total score
const calculateTotalScore = (project, agency) => {
  // Calculate individual scores
  const serviceOverlapScore = calculateServiceOverlap(
    project.needed_services,
    agency.offered_services
  );

  const budgetScore = calculateBudgetScore(
    {
      budget_min: project.budget_min,
      budget_max: project.budget_max
    },
    {
      budget_min: agency.budget_min,
      budget_max: agency.budget_max
    }
  );

  const ratingScore = getRatingScore(agency.agency_rating);

  const premiumBoost = getPremiumBoost(agency.subscription_type);

  // Calculate total score
  const totalScore = serviceOverlapScore + budgetScore + ratingScore + premiumBoost;

  // Return score breakdown
  return {
    service_overlap_score: serviceOverlapScore,
    budget_score: budgetScore,
    rating_score: ratingScore,
    premium_boost: premiumBoost,
    total_score: totalScore
  };
};

module.exports = { calculateTotalScore };
