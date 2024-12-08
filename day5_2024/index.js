const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n\n");

// Q 1
const part1 = input[0]
  .split("\n")
  .map((item) => item.split("|").map((item) => Number(item)));

const part2 = input[1].split("\n").map((item) => item.split(","));

// let sum = 0;
// function checkSortRules(array, rules) {
//   // Iterate through each rule
//   for (let [a, b] of rules) {
//     // Find the indices of a and b in the array
//     let indexA = array.indexOf(String(a));
//     let indexB = array.indexOf(String(b));

//     // If a or b is not found, skip this rule
//     if (indexA === -1 || indexB === -1) continue;

//     // If a does not appear before b, return false
//     if (indexA > indexB) {
//       return false;
//     }
//   }
//   // All rules are satisfied
//   sum += Number(array[Math.floor(array.length / 2)]);
//   console.log(sum);
//   return true;
// }

// part2.forEach((arr) => {
//   checkSortRules(arr, part1);
// });

// // Check if the array satisfies the sorting rules
// checkSortRules(part2, part1);

// Q 2

let sortedSum = 0;
function sortArrayByRulesWithGraph(array, rules) {
  // Convert array to integers for consistency
  const arr = array.map(Number);

  // Step 1: Build the graph (adjacency list) and in-degree map
  const graph = new Map();
  const inDegree = new Map();

  // Initialize nodes
  arr.forEach((num) => {
    graph.set(num, []);
    inDegree.set(num, 0);
  });

  // Add edges based on rules
  rules.forEach(([a, b]) => {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a).push(b);
    inDegree.set(b, (inDegree.get(b) || 0) + 1);
  });

  // Step 2: Perform topological sort using Kahn's algorithm
  const queue = [];
  const sorted = [];

  // Add nodes with in-degree 0 to the queue
  inDegree.forEach((degree, node) => {
    if (degree === 0) queue.push(node);
  });

  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    // Decrease in-degree of neighbors
    for (const neighbor of graph.get(current) || []) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // Step 3: Reorder the original array based on sorted order
  const positionMap = new Map();
  sorted.forEach((num, index) => {
    positionMap.set(num, index);
  });

  console.log(arr.sort((a, b) => positionMap.get(a) - positionMap.get(b)));

  sortedSum += arr.sort((a, b) => positionMap.get(a) - positionMap.get(b))[
    Math.floor(arr.length / 2)
  ];

  console.log(sortedSum);
  // return arr.sort((a, b) => positionMap.get(a) - positionMap.get(b));
}

part2.forEach((arr) => {
  sortArrayByRulesWithGraph(arr, part1);
});
