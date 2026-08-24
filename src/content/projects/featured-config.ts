/**
 * Central configuration for Featured Projects on the Home / Beranda page (REV-04-A).
 * Exactly 4 confirmed slots in specified order:
 *
 * 01. UKG System ("ukg-system")
 * 02. iHealth Edu ("ihealth-edu")
 * 03. ML Heart Attack Risk Prediction ("ml-for-heart-attack-risk-prediction")
 * 04. Panoramic Virtual Tour ("panoramic-virtual-tour")
 */

export interface HomeFeaturedConfig {
  slot1Slug: string;
  slot2Slug: string;
  slot3Slug: string;
  slot4Slug: string;
}

export const homeFeaturedConfig: HomeFeaturedConfig = {
  slot1Slug: "ukg-system",
  slot2Slug: "ihealth-edu",
  slot3Slug: "ml-for-heart-attack-risk-prediction",
  slot4Slug: "panoramic-virtual-tour",
};
