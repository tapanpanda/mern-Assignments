db.sales.aggregate([
  // Step 1: Unwind the items array to have one item per document
  {
    $unwind: "$items",
  },
  // Step 2: Group by store and month (we use $substr to extract year and month from date)
  {
    $group: {
      _id: {
        store: "$store",
        month: { $substr: ["$date", 0, 7] }, // Extract YYYY-MM from the date
      },
      totalRevenue: {
        $sum: { $multiply: ["$items.quantity", "$items.price"] },
      },
      totalQuantity: { $sum: "$items.quantity" }, // Sum the quantities for average price calculation
      totalPrice: { $sum: "$items.price" }, // Sum the prices for calculating the average price
    },
  },
  // Step 3: Calculate average price
  {
    $project: {
      store: "$_id.store",
      month: "$_id.month",
      totalRevenue: 1,
      averagePrice: { $divide: ["$totalRevenue", "$totalQuantity"] }, // Calculate average price
    },
  },
  // Step 4: Sort the output by store and then by month
  {
    $sort: { store: 1, month: 1 },
  },
]);

/*

//Output
[
  {
    "store": "Store A",
    "month": "2024-06",
    "totalRevenue": 230.0,
    "averagePrice": 15.0
  },
  {
    "store": "Store B",
    "month": "2024-06",
    "totalRevenue": 150.0,
    "averagePrice": 12.5
  }
]


*/
