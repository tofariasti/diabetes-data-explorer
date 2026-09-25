export type StudySummary = {
  nctId: string;
  title: string;
  status: string;
  summary: string;
  conditions: string[];
  phases: string[];
  sponsor: string;
};

export type StudyPage = {
  studies: StudySummary[];
  nextPageToken: string | null;
};

export type CountyEstimate = {
  state: string;
  county: string;
  value: number;
  year: string;
};

export class DataRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataRequestError";
  }
}
