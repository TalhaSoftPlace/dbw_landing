export const parsePlansdata = (data) => {
  let plansNames = [];
  data?.forEach((i) => plansNames.push(i?.name));
  plansNames = [...new Set(plansNames)];
  let plans = [];
  plansNames.forEach((p) => {
    let plan = { price: {}, features: [] };
    data?.forEach((i, idx) => {
      if (i.name === p) {
        plan.planId = idx;
        plan.name = p;
        plan.price[i.currency] = (plan.price[i.currency] ?? 0) + i.price;
        plan.desc = i.desc;
        plan.currency = 'usd';
        plan.symbol = '$';
        plan.features.push({
          id: i.priceId,
          price: i.price,
          currency: i.currency,
          type: 'user',
        });
      }
    });
    plans.push(plan);
  });
  return plans;
};
