import { useQuery } from "@tanstack/react-query";
import { fetchStudies, type StudyQuery } from "../api/clinicalTrials";

export function useStudies(query: StudyQuery) {
  return useQuery({
    queryKey: ["studies", query],
    queryFn: () => fetchStudies(query),
  });
}
