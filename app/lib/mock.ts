export const mockData = (itemId: string) => {
  const mockData = {
    item_id: itemId,
    status: "with_benchmark_high",
    currency_id: "BRL",
    ratio: 0.85,
    current_price: {
      amount: 1500,
      usd_amount: 300,
    },
    suggested_price: {
      amount: 1200,
      usd_amount: 240,
    },
    lowest_price: {
      amount: 1000,
      usd_amount: 200,
    },
    costs: {
      selling_fees: 180,
      shipping_fees: 50,
    },
    applicable_suggestion: true,
    percent_difference: 25,
    metadata: {
      graph: [
        {
          price: {
            amount: 1150,
            usd_amount: 230,
          },
          info: {
            title: "Produto Similar 1",
            sold_quantity: 45,
          },
        },
        {
          price: {
            amount: 1250,
            usd_amount: 250,
          },
          info: {
            title: "Produto Similar 2",
            sold_quantity: 32,
          },
        },
      ],
      compared_values: 15,
    },
    promotion_detail: {
      unhealthy_reason: "no_sales",
      days_unhealthy: 30,
      campaign_start_date: "2024-01-15",
      campaign_end_date: "2024-02-15",
      promotion_id: "P-MLB12345",
      discount_percent: 20,
      campaign_name: "UNHEALTHY_STOCK",
    },
    last_updated: "08-01-2025 14:30:00",
  };

  // Simulate different statuses based on item ID
  const statuses = [
    "with_benchmark_highest",
    "with_benchmark_high",
    "no_benchmark_ok",
    "no_benchmark_lowest",
    "promotion_active",
  ];

  const statusIndex = itemId.length % statuses.length;
  mockData.status = statuses[statusIndex] || "";

  // Adjust prices based on status
  switch (mockData.status) {
    case "with_benchmark_highest":
      mockData.current_price.amount = 1800;
      mockData.percent_difference = 50;
      break;
    case "no_benchmark_ok":
      mockData.current_price.amount = 1200;
      mockData.percent_difference = 0;
      break;
    case "no_benchmark_lowest":
      mockData.current_price.amount = 900;
      mockData.percent_difference = -25;
      break;
    case "promotion_active":
      mockData.promotion_detail = {
        ...mockData.promotion_detail,
        campaign_start_date: "2025-01-01",
        campaign_end_date: "2025-01-31",
      };
      break;
  }

  return mockData;
};
