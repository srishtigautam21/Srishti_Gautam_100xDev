/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let result = [];

  let groupedItems = Object.groupBy(transactions, ({ category }) => category);

  let objKeys = Object.keys(groupedItems);

  let obj = {};
  for (let item in groupedItems) {
    groupedItems[item].map((item) => {
      const { category } = item;
      obj[category] = (obj[category] || 0) + item.price;
    });

    result = objKeys.map((category) => ({
      category,
      totalSpent: obj[category],
    }));
  }

  return result;
}

module.exports = calculateTotalSpentByCategory;
