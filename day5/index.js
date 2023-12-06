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
] = input.slice(1).map((item) => createMap(item));

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

const locations = seeds.map((item) => {
  return connectSteps(
    connectSteps(
      connectSteps(
        connectSteps(
          connectSteps(
            connectSteps(
              connectSteps(item, seedToSoilMap),
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
});

console.log(Math.min(...locations));

function createMap(str) {
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
}
