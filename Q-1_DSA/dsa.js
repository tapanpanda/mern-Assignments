function lengthOfLIS(nums) {
  if (!nums || nums.length === 0) return 0; // Handle empty array case

  const dp = [];

  for (const num of nums) {
    let i = 0;

    // Find the position to place the number (replace the first number in dp that is greater or equal)
    while (i < dp.length && dp[i] < num) {
      i++;
    }

    if (i < dp.length) {
      dp[i] = num; // Replace the found position
    } else {
      dp.push(num); // Add a new subsequence
    }
  }

  return dp.length; // The length of the dp array is the length of the LIS
}

// Example Usage:
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums)); // Output: 4

