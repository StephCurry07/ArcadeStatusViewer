export const calculateArcadePoints = (arcadeCount, skillCount, arcadeNames)=> {
  const specialGameSet = new Set(
    arcadeNames.filter(name =>
      name.includes('TechCare') || name.includes('Certification Zone')
    )
  );
  
  const specialGames = specialGameSet.size;
  const regularArcadePoints = arcadeCount - specialGames;
  const specialGamePoints = specialGames * 2;
  const skillBadgePoints = skillCount * 0.5;
  
  return regularArcadePoints + specialGamePoints + skillBadgePoints;
};