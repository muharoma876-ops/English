export interface SlideItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  quotes?: string[];
  bulletPoints?: string[];
  imagePath: string;
  theme: {
    bg: string;
    text: string;
    accent: string;
    cardBg: string;
  };
  speakerNotes: {
    overview: string;
    deliveryTips: string[];
    audienceEngagementPrompt: string;
    estimatedMinutes: number;
  };
  pollData?: {
    question: string;
    options: {
      id: string;
      label: string;
      votes: number;
      reframe: string;
    }[];
  };
}

export type ViewMode = 'slideshow' | 'interactive' | 'presenter' | 'overview';

export interface DrawStroke {
  color: string;
  size: number;
  points: { x: number; y: number }[];
}

export interface UserPledge {
  goal: string;
  twoMinuteAction: string;
  scheduledTime: string;
  accountabilityPartner: string;
  dateSigned: string;
}
