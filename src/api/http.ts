import { DataRequestError } from "./types";

export async function fetchJson(url: string): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new DataRequestError(
      "The request did not reach the data source. Check your connection and try again.",
    );
  }

  if (!response.ok) {
    throw new DataRequestError(
      `The data source responded with ${response.status}. Try again in a moment.`,
    );
  }

  try {
    return (await response.json()) as unknown;
  } catch {
    throw new DataRequestError(
      "The data source returned a response we could not read.",
    );
  }
}
