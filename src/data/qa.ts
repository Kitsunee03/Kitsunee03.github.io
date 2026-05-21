export interface QAItem {
  id: string;
  question: string;
  answer: string;
}

export const QA_ITEMS: QAItem[] = [
  {
    id: "games",
    question: "What type of games are you most interested in?",
    answer:
      "I gravitate toward survival and open-world experiences. My favorite series include Fallout, Metro, BioShock, Destiny, and The Legend of Zelda, so I enjoy exploration, systems, and strong atmosphere.",
  },
  {
    id: "internships",
    question: "Are you open to internships or collaborations?",
    answer:
      "I'm not actively looking for full-time work yet, but I'm open to messages and collaborations. I'll also be looking for external university internships soon.",
  },
  {
    id: "role",
    question: "What role do you usually take in a team?",
    answer:
      "Gameplay programmer first, with game design input. I've also led small university teams (3-8 people) as a producer, helping keep scope and priorities clear.",
  },
  {
    id: "prototyping",
    question: "How do you approach prototyping and iteration?",
    answer:
      "I like to build a small, playable prototype early, then playtest and iterate based on feedback. Level design and player flow are areas I keep refining.",
  },
  {
    id: "teamwork",
    question: "How do you work with teams?",
    answer:
      "I'm calm and introverted, so I listen first and then give honest feedback. I'm comfortable working in groups and value clear communication and shared decisions.",
  },
  {
    id: "tools",
    question: "What tools do you enjoy using?",
    answer:
      "Unity, Unreal Engine, and Phaser are my main engines. I code in C# and C++, and I also use Processing for creative coding and Audacity for quick audio edits.",
  },
];
