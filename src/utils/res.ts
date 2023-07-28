import { type Personality } from "@prisma/client";

type PersonalityCompatibility = Readonly<{
  [x in Personality]: Readonly<{
    [y in Personality]: number;
  }>;
}>;

export const PERSONALITY_COMPATIBILITY: PersonalityCompatibility =
  Object.freeze({
    ESTP: Object.freeze({
      ESTP: 0.04,
      ISFP: 0.296,
      ISTP: 0.506,
      ESFP: 0.506,
      ESTJ: 0.296,
      ESFJ: 0.296,
      ISTJ: 0.506,
      ISFJ: 0.296,
      ENFJ: 0.714,
      INFJ: 0.506,
      ENFP: 0.506,
      INFP: 0.506,
      ENTJ: 0.296,
      INTJ: 0.714,
      ENTP: 0.867,
      INTP: 0.506,
    }),
    ISFP: Object.freeze({
      ESTP: 0.296,
      ISFP: 0.11,
      ISTP: 0.506,
      ESFP: 0.139,
      ESTJ: 0.296,
      ESFJ: 0.296,
      ISTJ: 0.139,
      ISFJ: 0.296,
      ENFJ: 0.296,
      INFJ: 0.867,
      ENFP: 0.867,
      INFP: 0.506,
      ENTJ: 0.714,
      INTJ: 0.714,
      ENTP: 0.506,
      INTP: 0.506,
    }),
    ISTP: Object.freeze({
      ESTP: 0.506,
      ISFP: 0.506,
      ISTP: 0.259,
      ESFP: 0.296,
      ESTJ: 0.867,
      ESFJ: 0.506,
      ISTJ: 0.714,
      ISFJ: 0.867,
      ENFJ: 0.139,
      INFJ: 0.296,
      ENFP: 0.714,
      INFP: 0.296,
      ENTJ: 0.139,
      INTJ: 0.506,
      ENTP: 0.714,
      INTP: 0.714,
    }),
    ESFP: Object.freeze({
      ESTP: 0.506,
      ISFP: 0.139,
      ISTP: 0.296,
      ESFP: 0.46,
      ESTJ: 0.506,
      ESFJ: 0.867,
      ISTJ: 0.714,
      ISFJ: 0.506,
      ENFJ: 0.506,
      INFJ: 0.296,
      ENFP: 0.296,
      INFP: 0.714,
      ENTJ: 0.506,
      INTJ: 0.139,
      ENTP: 0.296,
      INTP: 0.296,
    }),
    ESTJ: Object.freeze({
      ESTP: 0.296,
      ISFP: 0.296,
      ISTP: 0.867,
      ESFP: 0.506,
      ESTJ: 0.68,
      ESFJ: 0.714,
      ISTJ: 0.867,
      ISFJ: 0.952,
      ENFJ: 0.296,
      INFJ: 0.139,
      ENFP: 0.506,
      INFP: 0.139,
      ENTJ: 0.296,
      INTJ: 0.296,
      ENTP: 0.506,
      INTP: 0.506,
    }),
    ESFJ: Object.freeze({
      ESTP: 0.296,
      ISFP: 0.296,
      ISTP: 0.506,
      ESFP: 0.867,
      ESTJ: 0.714,
      ESFJ: 0.84,
      ISTJ: 0.867,
      ISFJ: 0.714,
      ENFJ: 0.296,
      INFJ: 0.506,
      ENFP: 0.506,
      INFP: 0.506,
      ENTJ: 0.714,
      INTJ: 0.051,
      ENTP: 0.139,
      INTP: 0.139,
    }),
    ISTJ: Object.freeze({
      ESTP: 0.506,
      ISFP: 0.139,
      ISTP: 0.714,
      ESFP: 0.714,
      ESTJ: 0.867,
      ESFJ: 0.867,
      ISTJ: 0.94,
      ISFJ: 0.867,
      ENFJ: 0.506,
      INFJ: 0.296,
      ENFP: 0.296,
      INFP: 0.296,
      ENTJ: 0.506,
      INTJ: 0.139,
      ENTP: 0.296,
      INTP: 0.296,
    }),
    ISFJ: Object.freeze({
      ESTP: 0.296,
      ISFP: 0.296,
      ISTP: 0.867,
      ESFP: 0.506,
      ESTJ: 0.952,
      ESFJ: 0.714,
      ISTJ: 0.867,
      ISFJ: 0.94,
      ENFJ: 0.296,
      INFJ: 0.139,
      ENFP: 0.506,
      INFP: 0.139,
      ENTJ: 0.296,
      INTJ: 0.296,
      ENTP: 0.506,
      INTP: 0.506,
    }),
    ENFJ: Object.freeze({
      ESTP: 0.714,
      ISFP: 0.296,
      ISTP: 0.139,
      ESFP: 0.506,
      ESTJ: 0.296,
      ESFJ: 0.296,
      ISTJ: 0.506,
      ISFJ: 0.296,
      ENFJ: 0.84,
      INFJ: 0.506,
      ENFP: 0.139,
      INFP: 0.506,
      ENTJ: 0.714,
      INTJ: 0.714,
      ENTP: 0.506,
      INTP: 0.506,
    }),
    INFJ: Object.freeze({
      ESTP: 0.506,
      ISFP: 0.867,
      ISTP: 0.296,
      ESFP: 0.296,
      ESTJ: 0.139,
      ESFJ: 0.506,
      ISTJ: 0.296,
      ISFJ: 0.139,
      ENFJ: 0.506,
      INFJ: 0.68,
      ENFP: 0.714,
      INFP: 0.714,
      ENTJ: 0.867,
      INTJ: 0.506,
      ENTP: 0.296,
      INTP: 0.296,
    }),
    ENFP: Object.freeze({
      ESTP: 0.506,
      ISFP: 0.867,
      ISTP: 0.714,
      ESFP: 0.296,
      ESTJ: 0.506,
      ESFJ: 0.506,
      ISTJ: 0.296,
      ISFJ: 0.506,
      ENFJ: 0.139,
      INFJ: 0.714,
      ENFP: 0.46,
      INFP: 0.296,
      ENTJ: 0.506,
      INTJ: 0.506,
      ENTP: 0.714,
      INTP: 0.296,
    }),
    INFP: Object.freeze({
      ESTP: 0.506,
      ISFP: 0.506,
      ISTP: 0.296,
      ESFP: 0.714,
      ESTJ: 0.139,
      ESFJ: 0.506,
      ISTJ: 0.296,
      ISFJ: 0.139,
      ENFJ: 0.506,
      INFJ: 0.714,
      ENFP: 0.296,
      INFP: 0.25,
      ENTJ: 0.506,
      INTJ: 0.506,
      ENTP: 0.296,
      INTP: 0.714,
    }),
    ENTJ: Object.freeze({
      ESTP: 0.296,
      ISFP: 0.714,
      ISTP: 0.139,
      ESFP: 0.506,
      ESTJ: 0.296,
      ESFJ: 0.714,
      ISTJ: 0.506,
      ISFJ: 0.296,
      ENFJ: 0.714,
      INFJ: 0.867,
      ENFP: 0.506,
      INFP: 0.506,
      ENTJ: 0.11,
      INTJ: 0.296,
      ENTP: 0.139,
      INTP: 0.139,
    }),
    INTJ: Object.freeze({
      ESTP: 0.714,
      ISFP: 0.714,
      ISTP: 0.506,
      ESFP: 0.139,
      ESTJ: 0.296,
      ESFJ: 0.051,
      ISTJ: 0.139,
      ISFJ: 0.296,
      ENFJ: 0.714,
      INFJ: 0.506,
      ENFP: 0.506,
      INFP: 0.506,
      ENTJ: 0.296,
      INTJ: 0.03,
      ENTP: 0.867,
      INTP: 0.867,
    }),
    ENTP: Object.freeze({
      ESTP: 0.867,
      ISFP: 0.506,
      ISTP: 0.714,
      ESFP: 0.296,
      ESTJ: 0.506,
      ESFJ: 0.139,
      ISTJ: 0.296,
      ISFJ: 0.506,
      ENFJ: 0.506,
      INFJ: 0.296,
      ENFP: 0.714,
      INFP: 0.296,
      ENTJ: 0.139,
      INTJ: 0.867,
      ENTP: 0.11,
      INTP: 0.714,
    }),
    INTP: Object.freeze({
      ESTP: 0.506,
      ISFP: 0.506,
      ISTP: 0.714,
      ESFP: 0.296,
      ESTJ: 0.506,
      ESFJ: 0.139,
      ISTJ: 0.296,
      ISFJ: 0.506,
      ENFJ: 0.506,
      INFJ: 0.296,
      ENFP: 0.296,
      INFP: 0.714,
      ENTJ: 0.139,
      INTJ: 0.867,
      ENTP: 0.714,
      INTP: 0.25,
    }),
  });

type PersonalityDescription = Record<
  Personality,
  {
    name: string;
    description: string;
  }
>;

export const personalityDescription: PersonalityDescription = {
  INTJ: {
    name: "Architect",
    description:
      "INTJs are analytical problem-solvers, eager to improve systems and processes with their innovative ideas. They have a talent for seeing possibilities for improvement, whether at work, at home, or in themselves.",
  },
  INTP: {
    name: "Logician",
    description:
      "INTPs are philosophical innovators, fascinated by logical analysis, systems, and design. They are preoccupied with theory, and search for the universal law behind everything they see. They want to understand the unifying themes of life, in all their complexity.",
  },
  ENTJ: {
    name: "Commander",
    description:
      "ENTJs are strategic leaders, motivated to organize change. They are quick to see inefficiency and conceptualize new solutions, and enjoy developing long-range plans to accomplish their vision. They excel at logical reasoning and are usually articulate and quick-witted.",
  },
  ENTP: {
    name: "Debater",
    description:
      "ENTPs are inspired innovators, motivated to find new solutions to intellectually challenging problems. They are curious and clever, and seek to comprehend the people, systems, and principles that surround them.",
  },
  INFJ: {
    name: "Advocate",
    description:
      "INFJs are creative nurturers with a strong sense of personal integrity and a drive to help others realize their potential. Creative and dedicated, they have a talent for helping others with original solutions to their personal challenges.",
  },
  INFP: {
    name: "Mediator",
    description:
      "INFPs are imaginative idealists, guided by their own core values and beliefs. To a Healer, possibilities are paramount; the reality of the moment is only of passing concern. They see potential for a better future, and pursue truth and meaning with their own flair.",
  },
  ENFJ: {
    name: "Protagonist",
    description:
      "ENFJs are idealist organizers, driven to implement their vision of what is best for humanity. They often act as catalysts for human growth because of their ability to see potential in other people and their charisma in persuading others to their ideas.",
  },
  ENFP: {
    name: "Campaigner",
    description:
      "ENFPs are people-centered creators with a focus on possibilities and a contagious enthusiasm for new ideas, people and activities. Energetic, warm, and passionate, ENFPs love to help other people explore their creative potential.",
  },
  ISTJ: {
    name: "Logistician",
    description:
      "ISTJs are responsible organizers, driven to create and enforce order within systems and institutions. They are neat and orderly, inside and out, and tend to have a procedure for everything they do.",
  },
  ISFJ: {
    name: "Defender",
    description:
      "ISFJs are industrious caretakers, loyal to traditions and organizations. They are practical, compassionate, and caring, and are motivated to provide for others and protect them from the perils of life.",
  },
  ESTJ: {
    name: "Executive",
    description:
      "ESTJs are hardworking traditionalists, eager to take charge in organizing projects and people. Orderly, rule-abiding, and conscientious, ESTJs like to get things done, and tend to go about projects in a systematic, methodical way.",
  },
  ESFJ: {
    name: "Consul",
    description:
      "ESFJs are conscientious helpers, sensitive to the needs of others and energetically dedicated to their responsibilities. They are highly attuned to their emotional environment and attentive to both the feelings of others and the perception others have of them.",
  },
  ISTP: {
    name: "Virtuoso",
    description:
      "ISTPs are observant artisans with an understanding of mechanics and an interest in troubleshooting. They approach their environments with a flexible logic, looking for practical solutions to the problems at hand.",
  },
  ISFP: {
    name: "Adventurer",
    description:
      "ISFPs are gentle caretakers who live in the present moment and enjoy their surroundings with cheerful, low-key enthusiasm. They are flexible and spontaneous, and like to go with the flow to enjoy what life has to offer.",
  },
  ESTP: {
    name: "Entrepreneur",
    description:
      "ESTPs are energetic thrillseekers who are at their best when putting out fires, whether literal or metaphorical. They bring a sense of dynamic energy to their interactions with others and the world around them.",
  },
  ESFP: {
    name: "Entertainer",
    description:
      "ESFPs are vivacious entertainers who charm and engage those around them. They are spontaneous, energetic, and fun-loving, and take pleasure in the things around them: food, clothes, nature, animals, and especially people.",
  },
};
