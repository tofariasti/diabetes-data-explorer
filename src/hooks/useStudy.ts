import { useQuery } from "@tanstack/react-query";
import { fetchStudy } from "../api/clinicalTrials";

export function useStudy(nctId: string) {
  return useQuery({
    queryKey: ["study", nctId],
    queryFn: () => fetchStudy(nctId),
  });
}
