import { SlideItem } from '../types/presentation';

export const INITIAL_SLIDES: SlideItem[] = [
  {
    id: 'slide-1',
    number: 1,
    title: 'WHAT IF I FAIL?',
    subtitle: 'The universal internal dialogue of hesitation',
    quotes: [
      'What if they laugh at me?',
      'What if I’m not good enough?'
    ],
    imagePath: '/src/assets/images/presentation_anxious_stage_1792393953862.jpg',
    theme: {
      bg: '#0a1120',
      text: '#f8fafc',
      accent: '#f59e0b',
      cardBg: 'rgba(15, 23, 42, 0.75)',
    },
    speakerNotes: {
      overview: 'Open with silent posture. Establish the heavy tension in the room. Everyone has stood in this imaginary spotlight.',
      deliveryTips: [
        'Pause for 3 full seconds before saying a single word.',
        'Acknowledge the physical sensation of dread: dry throat, elevated pulse.',
        'Address the audience directly: "Notice how the voice in our head asks catastrophic questions that never come true."'
      ],
      audienceEngagementPrompt: 'Ask the audience to raise hands or click the poll: When was the last time you delayed an idea because of imaginary laughter?',
      estimatedMinutes: 2.5,
    },
    pollData: {
      question: 'Which fear whispers loudest right before you step forward?',
      options: [
        {
          id: 'opt-judgement',
          label: 'Fear of Judgement ("They will laugh or criticize")',
          votes: 42,
          reframe: 'The Spotlight Fallacy: Audiences are so preoccupied with their own insecurities that they admire anyone brave enough to stand up.'
        },
        {
          id: 'opt-imposter',
          label: 'Imposter Syndrome ("I’m not qualified or smart enough")',
          votes: 68,
          reframe: 'Competence is an artifact of repetition. Nobody feels "qualified" until long after they have already delivered.'
        },
        {
          id: 'opt-perfection',
          label: 'Perfectionism ("If it is not flawless, I shouldn’t begin")',
          votes: 55,
          reframe: 'Perfectionism is merely anxiety in a polished suit. Finished and imperfect beats flawless and unreleased every day.'
        },
        {
          id: 'opt-regret',
          label: 'Fear of Failure ("What if it crashes and burns?") ',
          votes: 31,
          reframe: 'Failure is not the opposite of success; it is the raw curriculum from which mastery is built.'
        }
      ]
    }
  },
  {
    id: 'slide-2',
    number: 2,
    title: 'CONFIDENCE COMES AFTER ACTION',
    subtitle: 'You learn by trying, not by waiting.',
    quotes: [
      'You learn by trying, not by waiting.'
    ],
    bulletPoints: [
      'The Paradox: Waiting to feel ready guarantees permanent hesitation.',
      'Action produces data, data refines competence, competence produces confidence.',
      'The child on the bicycle didn’t read manuals for 10 years — they wobbled first.'
    ],
    imagePath: '/src/assets/images/presentation_child_bicycle_1792393954809.jpg',
    theme: {
      bg: '#062016',
      text: '#f8fafc',
      accent: '#34d399',
      cardBg: 'rgba(6, 44, 30, 0.7)',
    },
    speakerNotes: {
      overview: 'Shift the emotional palette from shadow to sunlight. Bring energy and warmth into your tone.',
      deliveryTips: [
        'Smile gently. Point to the child on the bicycle.',
        'Ask: "Who here waited until they felt completely confident before learning to ride a bike?"',
        'Emphasize the core thesis: Confidence is not an entry ticket; it is the receipt of survived attempts.'
      ],
      audienceEngagementPrompt: 'Invite the audience to think of one skill they now take for granted that once terrified them.',
      estimatedMinutes: 3.0,
    }
  },
  {
    id: 'slide-3',
    number: 3,
    title: 'START SMALL',
    subtitle: 'Small actions create big changes.',
    quotes: [
      'Small actions create big changes.'
    ],
    bulletPoints: [
      '1 Speak for one minute',
      '2 Start a conversation',
      '3 Take one small step'
    ],
    imagePath: '/src/assets/images/presentation_lofi_desk_1792393956144.jpg',
    theme: {
      bg: '#181310',
      text: '#fdf8f4',
      accent: '#fb923c',
      cardBg: 'rgba(38, 26, 18, 0.75)',
    },
    speakerNotes: {
      overview: 'De-escalate the stakes. Show that monumental transformations begin as ridiculously small micro-commitments.',
      deliveryTips: [
        'Speak in a calm, inviting conversational cadence.',
        'Demonstrate the 1-minute principle live or run the interactive timer.',
        'Stress: "A micro-action lowers the activation energy of the amygdala."'
      ],
      audienceEngagementPrompt: 'Conduct the live 60-second challenge with the room or interactive timer.',
      estimatedMinutes: 3.5,
    }
  },
  {
    id: 'slide-4',
    number: 4,
    title: 'YOU DON’T NEED TO FEEL READY TO START.',
    subtitle: 'TAKE THE FIRST STEP TODAY.',
    quotes: [
      'YOU DON’T NEED TO FEEL READY TO START.',
      'TAKE THE FIRST STEP TODAY.'
    ],
    bulletPoints: [
      'Readiness is a myth crafted by comfort.',
      'Courage is taking action while the uncertainty still exists.',
      'The path only reveals itself to those in motion.'
    ],
    imagePath: '/src/assets/images/presentation_sunrise_trail_1792393955788.jpg',
    theme: {
      bg: '#1a101f',
      text: '#faf5ff',
      accent: '#f59e0b',
      cardBg: 'rgba(40, 20, 50, 0.7)',
    },
    speakerNotes: {
      overview: 'Deliver the crescendo. Call to immediate commitment. Provide the takeaway manifesto pass.',
      deliveryTips: [
        'Look directly at the audience with grounded sincerity.',
        'Slow down each word of "You don’t need to feel ready to start."',
        'Have audience members write down their single 2-minute step on the interactive action card.'
      ],
      audienceEngagementPrompt: 'Everyone generates their "First Step Action Pass" before concluding.',
      estimatedMinutes: 2.0,
    }
  }
];
