export type TopicKey =
  | 'stars'
  | 'galaxies'
  | 'black-holes'
  | 'nebulae'
  | 'exoplanets'
  | 'planetary-systems';

export type NasaTechSlug =
  | 'apollo-guidance-computer'
  | 'kepler-space-telescope'
  | 'sojourner-rover'
  | 'lunar-roving-vehicles'
  | 'pioneer-10-11';

export interface ComicPage {
  pageNumber: number;
  imagePath: string;
  alt: string;
  isPlaceholder?: boolean;
}

export interface ComicChapter {
  id: string;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  isComingSoon?: boolean;
  pages: ComicPage[];
}

export interface SourceReference {
  publisher: string;
  title: string;
  url: string;
}

export interface ImageAssetInfo {
  src: string;
  webpSrc?: string;
  alt: string;
  credit: string;
  caption?: string;
  placeholderLabel?: string;
  expectedFolder?: string;
  width?: number;
  height?: number;
  objectPosition?: string;
}

export interface NasaTechSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: {
    label?: string;
    text: string;
  }[];
}

export interface NasaTechMissionCard {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  highlights: string[];
}

export interface NasaTechComparisonRow {
  feature: string;
  leftValue: string;
  rightValue: string;
}

export interface NasaTechItem {
  slug: string;
  name: string;
  categoryLabel: string;
  eraLabel: string;
  shortDescription: string;
  keyHighlight: string;
  coverImage?: ImageAssetInfo;
  heroImage: ImageAssetInfo;
  introParagraphs: string[];
  sections: NasaTechSection[];
  /** Optional sub-blocks for notable missions (e.g., Apollo 15, 16, 17 LRV) */
  notableMissions?: {
    sectionTitle: string;
    intro?: string;
    items: NasaTechMissionCard[];
  };
  /** Optional parallel twin-mission comparison blocks (e.g., Pioneer 10 & Pioneer 11) */
  parallelMissions?: {
    sectionTitle: string;
    left: NasaTechMissionCard;
    right: NasaTechMissionCard;
  };
  /** Optional structured comparison table */
  comparisonTable?: {
    sectionTitle: string;
    leftHeader: string;
    rightHeader: string;
    rows: NasaTechComparisonRow[];
  };
  /** Optional symbolic artifact spotlight (e.g., Pioneer Plaque) */
  artifactSpotlight?: {
    sectionTitle: string;
    title: string;
    paragraphs: string[];
    elementsList?: string[];
  };
  gallery: ImageAssetInfo[];
  sources: SourceReference[];
}

export interface ExploreTopic {
  slug: TopicKey;
  name: string;
  shortDescription: string;
  intriguingFact: string;
  heroImage: ImageAssetInfo;
  overview: string[];
  keyConcepts: {
    title: string;
    description: string;
  }[];
  howScientistsStudy: string[];
  gallery: ImageAssetInfo[];
  didYouKnow: {
    fact: string;
    source: SourceReference;
  };
  sources: SourceReference[];
}

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  criterion: string;
  iconType: 'rocket' | 'chapter' | 'telescope';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoPath?: string;
  bio?: string;
}
