import { useQuery } from "@tanstack/react-query";
import { fetchCounties, type PlaceQuery } from "../api/places";

export function useCounties(query: PlaceQuery) {
  return useQuery({
    queryKey: ["counties", query],
    queryFn: () => fetchCounties(query),
  });
}
