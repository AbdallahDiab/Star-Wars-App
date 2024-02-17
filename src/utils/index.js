//func takes arrays arguments and returns an array of matching elements
export function findMatches(...arrays) {
  // remove undefined arrays which generated if you did not use a specific filter function
  const filteredArrays = arrays.filter((word) => word !== undefined);

  const uniqueValues = new Set(filteredArrays.flat());
  const matchedItems = [];

  for (const value of uniqueValues) {
    const occurrences = filteredArrays?.filter((array) =>
      array?.includes(value)
    ).length;

    if (occurrences === filteredArrays.length) {
      matchedItems.push(value);
    }
  }

  return matchedItems;
}

// fun takes url of people and returns its id
export function extractIdFromUrl(url) {
  const regex = /\/(\d+)\/$/;
  const match = url?.match(regex);

  if (match) {
    return parseInt(match[1], 10);
  }

  return null;
}
