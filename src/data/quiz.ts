export type Question = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

export const QUIZ_QUESTIONS: Question[] = [
  { id: 1, question: "Where did we take our first Solo trip?", options: ["Manali", "Lonavala", "Jaipur", "Rishikesh"], correctIndex: 1 },
  { id: 2, question: "Which movie I like most?", options: ["3 Idiots", "YJHD", "Robot", "Lagaan"], correctIndex: 2 },
  { id: 3, question: "Your favorite night snack?", options: ["Momos", "Chips", "Chocolate", "Maggie"], correctIndex: 0 },
  { id: 4, question: "Who always wins at board games?", options: ["You", "Me", "Always a draw", "Mom"], correctIndex: 0 },
  { id: 5, question: "Which is my Favourite Food?", options: ["Rajma Chawal", "Paneer Tikka", "Paneer Paratha", "Chole Bhature"], correctIndex: 0 },
  { id: 6, question: "Which festival is my favorite?", options: ["Diwali", "Holi", "Rakshabandhan", "Navratri"], correctIndex: 0 },
  { id: 7, question: "Nick-name I call you most?", options: ["Didi", "Ooye", "Moti", "Pagli"], correctIndex: 1 },
  { id: 8, question: "My favorite season?", options: ["Winter", "Rainy", "Summer", "Autumn"], correctIndex: 2 },
  { id: 9, question: "What color do I love wearing?", options: ["Blue", "Lavender", "Black", "Yellow"], correctIndex: 0 },
  { id: 10, question: "My dream travel destination?", options: ["Paris", "USA", "Germany", "Switzerland"], correctIndex: 2 },
];
