import { describe, expect, it } from "vitest";
import { normalizeCounty, normalizeStudy } from "./normalize";

describe("normalizeStudy", () => {
  it("flattens a nested registry record and skips a record without a title", () => {
    expect(
      normalizeStudy({
        protocolSection: {
          identificationModule: {
            nctId: "NCT1",
            briefTitle: "A diabetes study",
          },
          statusModule: { overallStatus: "RECRUITING" },
          conditionsModule: { conditions: ["Diabetes Mellitus"] },
          designModule: { phases: ["PHASE2", "NA"] },
        },
      }),
    ).toMatchObject({
      nctId: "NCT1",
      title: "A diabetes study",
      status: "Recruiting",
      phases: ["Phase 2"],
    });

    expect(normalizeStudy({ protocolSection: {} })).toBeNull();
  });
});

describe("normalizeCounty", () => {
  it("drops a county row when the estimate is missing", () => {
    expect(
      normalizeCounty({
        stateabbr: "TX",
        locationname: "Loving",
        year: "2023",
      }),
    ).toBeNull();

    expect(
      normalizeCounty({
        stateabbr: "SD",
        locationname: "Oglala Lakota",
        data_value: "23.8",
        year: "2023",
      }),
    ).toEqual({
      state: "SD",
      county: "Oglala Lakota",
      value: 23.8,
      year: "2023",
    });
  });
});
