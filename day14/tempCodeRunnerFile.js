f (
    i >= 0 &&
    i < height &&
    j >= 0 &&
    j < width &&
    clonedRows[i][j] === "O"
  ) {
    if (i === 0 || clonedRows[i - 1][j] === "#") {
      // Case 2: Do nothing
      return;
    } else if (clonedRows[i - 1][j] === ".") {
      // Case 1: Swap with the empty space above
      [clonedRows[i][j], clonedRows[i - 1][j]] = [
        clonedRows[i - 1][j],
        clonedRows[i][j],
      ];
      handleRock(i - 1, j); // Recursively handle the moved rock in the line above
    } else if (clonedRows[i - 1][j] === "O") {
      // Case 3: Recursively handle the rock in the line above
      handleRock(i - 1, j);
    }
  }
}
