export interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "true_false";
  question: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
  explanation?: string;
}

export type LessonQuizId = 
  | "daniel-1" | "daniel-2" | "daniel-7" | "2300-days" | "daniel-9" | "70-week-prophecy" | "daniel-12" 
  | "seven-seals" | "revelation-13" | "revelation-14"
  | "love-for-god" | "righteousness-by-faith" | "the-resurrection" | "jesus-at-the-centre";

export const quizData: Record<LessonQuizId, QuizQuestion[]> = {
  "daniel-1": [
    {
      id: "d1-q1",
      type: "multiple_choice",
      question: "In what year did Nebuchadnezzar first besiege Jerusalem and take Daniel captive?",
      options: ["605 BC", "539 BC", "586 BC", "457 BC"],
      correctAnswer: "605 BC",
      hint: "It was before the complete destruction of Jerusalem.",
      explanation: "The first siege and captivity of Daniel and his friends occurred in 605 BC.",
    },
    {
      id: "d1-q2",
      type: "multiple_choice",
      question: "What requested diet did Daniel and his friends choose instead of the king's rich food?",
      options: ["Only bread and wine", "Vegetables (pulse) and water", "Fasting entirely", "Fish and water"],
      correctAnswer: "Vegetables (pulse) and water",
      hint: "It was a simple, plant-based diet.",
      explanation: "Daniel purposed in his heart not to defile himself with the king's food (often offered to idols), choosing a simple diet of pulse and water.",
    },
    {
      id: "d1-q3",
      type: "multiple_choice",
      question: "How long was the initial test period for their requested diet?",
      options: ["3 Days", "7 Days", "10 Days", "3 Years"],
      correctAnswer: "10 Days",
      hint: "A short, distinct period to prove physical health.",
      explanation: "Daniel proposed a 10-day test to the overseer to prove their health would not decline.",
    },
    {
      id: "d1-q4",
      type: "true_false",
      question: "True or False: At the end of their three-year training, the king found Daniel and his friends to be twice as wise as the magicians of Babylon.",
      options: ["True", "False"],
      correctAnswer: "False",
      hint: "The multiplier was much higher than two.",
      explanation: "Nebuchadnezzar actually found them to be TEN times wiser than all the magicians and astrologers.",
    }
  ],
  "daniel-2": [
    {
      id: "d2-q1",
      type: "multiple_choice",
      question: "What did the head of gold on the statue represent, according to Daniel?",
      options: ["Medo-Persia", "Greece", "Babylon", "Rome"],
      correctAnswer: "Babylon",
      hint: "It was the specific kingdom ruling at the time of the dream.",
      explanation: "Daniel explicitly told Nebuchadnezzar, 'You are this head of gold.' It represented the kingdom of Babylon.",
    },
    {
      id: "d2-q2",
      type: "multiple_choice",
      question: "What does the stone 'cut out without hands' represent?",
      options: ["The eternal kingdom of God (Christ)", "A future human, earthly empire", "A great philosophical movement", "An asteroid hitting earth"],
      correctAnswer: "The eternal kingdom of God (Christ)",
      hint: "It destroys all human kingdoms and lasts forever.",
      explanation: "The stone cut without hands clearly signifies a kingdom established by divine initiative, ultimately pointing to Christ and his eternal kingdom.",
    }
  ],
  "daniel-7": [
    {
      id: "d7-q1",
      type: "multiple_choice",
      question: "What parallel does the four-headed leopard with wings represent in Daniel 7?",
      options: ["Babylon", "Medo-Persia", "Greece", "Rome"],
      correctAnswer: "Greece",
      hint: "Known for the speed of its conquests under Alexander the Great.",
      explanation: "The swift winged leopard represents Greece, which rapidly conquered the known world before splitting into four parts upon Alexander's death.",
    },
    {
      id: "d7-q2",
      type: "true_false",
      question: "True or False: The 'Little Horn' in Daniel 7 is described as wearing out the saints and thinking to change times and laws.",
      options: ["True", "False"],
      correctAnswer: "True",
      hint: "Review the prophetic identifiers of this specific power.",
      explanation: "The identifying marks of the little horn power include blaspheming God, persecuting the saints, and attempting to alter divine times and laws.",
    }
  ],
  "2300-days": [],
  "daniel-9": [],
  "70-week-prophecy": [],
  "daniel-12": [],
  "seven-seals": [],
  "revelation-13": [],
  "revelation-14": [],
  "love-for-god": [
    {
      id: "lfg-q1",
      type: "multiple_choice",
      question: "According to 1 John 4:19, why do we love God?",
      options: ["To earn salvation", "Because He first loved us", "Out of fear of judgment", "Because we were told to"],
      correctAnswer: "Because He first loved us",
      hint: "Our love is a response, not an initiative.",
      explanation: "1 John 4:19 states clearly: 'We love because he first loved us.'",
    }
  ],
  "righteousness-by-faith": [
    {
      id: "rbf-q1",
      type: "multiple_choice",
      question: "In Romans 4:3, what was counted to Abraham as righteousness?",
      options: ["His works", "His circumcision", "His belief in God", "His sacrifice of Isaac"],
      correctAnswer: "His belief in God",
      hint: "It was a result of his faith.",
      explanation: "The text says, 'Abraham believed God, and it was counted to him as righteousness.'",
    }
  ],
  "the-resurrection": [
    {
      id: "tr-q1",
      type: "multiple_choice",
      question: "What does 1 Corinthians 15 say about our faith if Christ has not been raised?",
      options: ["It is still valuable", "It is futile", "It is based on tradition", "It is just a theory"],
      correctAnswer: "It is futile",
      hint: "If death isn't defeated, our hope is empty.",
      explanation: "Paul writes, 'If Christ has not been raised, your faith is futile; you are still in your sins.'",
    }
  ],
  "jesus-at-the-centre": [
    {
      id: "jatc-q1",
      type: "multiple_choice",
      question: "In John 5:39, what did Jesus say the Scriptures testify about?",
      options: ["Historical events", "Moral laws", "The prophets", "Jesus Himself"],
      correctAnswer: "Jesus Himself",
      hint: "He is the heart of every page.",
      explanation: "Jesus said, 'You study the Scriptures... These are the Scriptures that testify about me.'",
    }
  ]
};

// Helper function to safely fetch quiz data or an empty array if undefined
export function getQuizQuestions(lessonSlug: string): QuizQuestion[] {
  return quizData[lessonSlug as LessonQuizId] || [];
}
