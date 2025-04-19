export interface ProfileData {
  profileUrl: string;
  access: string;
  milestone: string;
  skillCount: number;
  skillNames: string;
  arcadeCount: number;
  arcadeNames: string;
  triviaCount: number;
  triviaNames: string;
  labCount: number;
  labNames: string;
  arcadePoints: number;
}

export interface SampleDataType {
  [key: string]: ProfileData;
}