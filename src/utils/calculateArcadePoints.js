/**
 * Calculate arcade points based on the formula:
 * Arcade Points = Number of arcade items + (Number of skill badges * 0.5)
 */
export const calculateArcadePoints = (arcadeCount, skillCount)=> {
  return arcadeCount + (skillCount * 0.5);
};