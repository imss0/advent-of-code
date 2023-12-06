const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n\n");

const seeds = input[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((item) => +item);

const [
  seedToSoilMap,
  soilToFertilizerMap,
  fertilizerToWaterMap,
  waterToLightMap,
  lightToTemperatureMap,
  temperatureToHumidityMap,
  humidityToLocationMap,
] = input.slice(1).map((str) => {
  const lines = str
    .split(":")[1]
    .trim()
    .split("\n")
    .map((item) => item.split(" "));
  const processed = lines.map((item) => ({
    destinationRangeStart: +item[0],
    sourceRangeStart: +item[1],
    rangeLength: +item[2],
  }));
  return processed;
});

function connectSteps(seed, maps) {
  let result = seed;
  maps.forEach((map) => {
    if (
      map.sourceRangeStart <= seed &&
      map.sourceRangeStart + map.rangeLength >= seed
    ) {
      result = map.destinationRangeStart + (seed - map.sourceRangeStart);
    }
  });

  return result;
}

// function getMoreSeeds(seeds) {
const locations = [];

for (let i = 0; i < seeds.length; i += 2) {
  const rangeStart = seeds[i];
  const rangeLength = seeds[i + 1];

  for (let j = 0; j < rangeLength; j++) {
    const result = connectSteps(
      connectSteps(
        connectSteps(
          connectSteps(
            connectSteps(
              connectSteps(
                connectSteps(rangeStart + j, seedToSoilMap),
                soilToFertilizerMap
              ),
              fertilizerToWaterMap
            ),
            waterToLightMap
          ),
          lightToTemperatureMap
        ),
        temperatureToHumidityMap
      ),
      humidityToLocationMap
    );

    locations.push([result]);
  }
}

console.log(locations);

//   return newSeeds;
// }

// const newSeeds = getMoreSeeds(seeds);
// console.log(newSeeds);

// const locations = newSeeds.map((item) => {
//   return connectSteps(
//     connectSteps(
//       connectSteps(
//         connectSteps(
//           connectSteps(
//             connectSteps(
//               connectSteps(item, seedToSoilMap),
//               soilToFertilizerMap
//             ),
//             fertilizerToWaterMap
//           ),
//           waterToLightMap
//         ),
//         lightToTemperatureMap
//       ),
//       temperatureToHumidityMap
//     ),
//     humidityToLocationMap
//   );
// });

console.log(Math.min(...locations));
