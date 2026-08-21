export type CertificateCategory =
  | "all"
  | "networking"
  | "ai-data"
  | "academic-experience";

export interface CertificateItem {
  id: string;
  title: {
    en: string;
    id: string;
  };
  issuer: string;
  category: CertificateCategory;
  assetPath: string;
  badge: string;
  credentialNote?: {
    en: string;
    id: string;
  };
}

export interface EducationItem {
  institution: {
    en: string;
    id: string;
  };
  degree: {
    en: string;
    id: string;
  };
  fieldOfStudy: {
    en: string;
    id: string;
  };
  distinction?: {
    en: string;
    id: string;
  };
  period: string;
  location: string;
  highlights: {
    en: string[];
    id: string[];
  };
  certificateAsset?: string;
}

export interface EngineeringPrinciple {
  index: string;
  code: string;
  title: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
}

export interface TechnicalTaxonomyGroup {
  category: {
    en: string;
    id: string;
  };
  items: {
    name: string;
    context: string;
  }[];
}
