export type Scenario = {
  id: number;
  title: string;
  situation: string;
  options: string[];
  correct: number;
  explanation: string;
  principle: string;
  sdgs: number[];
};

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "The Plastic Bottle Dilemma",
    situation: "You are thirsty at a store. A cold single-use plastic bottle is on sale. You have an empty reusable bottle in your bag, and a water refill station is a few steps away.",
    options: [
      "Buy the plastic bottle because it is quick and cold.",
      "Refill your reusable bottle at the refill station.",
      "Buy two plastic bottles so you will not need to stop again.",
      "Buy the plastic bottle and plan to recycle it later, if you remember.",
    ],
    correct: 1,
    explanation: "Reusing a bottle avoids creating waste in the first place, which is more effective than recycling after the fact. Small repeated habits add up when many people share them.",
    principle: "Responsibility",
    sdgs: [12, 14],
  },
  {
    id: 2,
    title: "Electricity Responsibility",
    situation: "You are the last person to leave a classroom. The lights, fans and projector are all still on, and no one will use the room for the rest of the day.",
    options: [
      "Leave quickly. The electricity bill is not your concern.",
      "Wait and hope someone else turns them off.",
      "Switch off the lights, fans and equipment you are allowed to, and tell staff about anything you cannot switch off.",
      "Switch off only the lights, since they are the easiest.",
    ],
    correct: 2,
    explanation: "Energy used by idle equipment is wasted and, where electricity comes from fossil fuels, adds to emissions. Taking responsibility for shared spaces is part of being accountable.",
    principle: "Accountability",
    sdgs: [7, 13],
  },
  {
    id: 3,
    title: "Water Conservation",
    situation: "You notice a tap running continuously at the school wash area, and no one is using it.",
    options: [
      "Ignore it. Water comes from the tap, so it will never run out.",
      "Leave it running so the next person does not have to open it.",
      "Take a photo of it for social media and walk away.",
      "Close the tap, and report it to maintenance if it keeps leaking or will not close.",
    ],
    correct: 3,
    explanation: "Fresh water is a limited shared resource, and treating and delivering it also uses energy. Acting on small waste, and reporting leaks, protects what the whole community depends on.",
    principle: "Common Good",
    sdgs: [6, 12],
  },
  {
    id: 4,
    title: "Waste Segregation",
    situation: "You finish a snack. You have a banana peel, a clean paper wrapper and an empty plastic pouch. The bins in front of you are labeled biodegradable, recyclable and residual.",
    options: [
      "Sort each item into the bin that matches its label, following your local rules.",
      "Throw everything into the nearest bin to save time.",
      "Put everything in the biodegradable bin because it all breaks down eventually.",
      "Leave the items on the bench for the cleaner to deal with.",
    ],
    correct: 0,
    explanation: "Sorting at the source makes composting and recycling possible and reduces what ends up in landfills or waterways. Mixed waste is harder and sometimes impossible to recover.",
    principle: "Responsibility",
    sdgs: [11, 12],
  },
  {
    id: 5,
    title: "Online Shopping",
    situation: "You are about to place three separate online orders for small items from three different shops, although you already own similar items.",
    options: [
      "Place all three orders right away. Fast delivery is what matters.",
      "Pause and ask whether you really need them. If so, combine them into one order with minimal packaging.",
      "Order them all and return whatever you do not like.",
      "Order them and request extra gift wrapping for each.",
    ],
    correct: 1,
    explanation: "Every product and package uses materials and energy, and extra deliveries add emissions. Asking whether you need something is the most effective step toward responsible consumption.",
    principle: "Sustainable Development",
    sdgs: [12, 13],
  },
  {
    id: 6,
    title: "Food Waste",
    situation: "After a family gathering, a lot of cooked food is left over. A relative says it is easier to throw it all away.",
    options: [
      "Throw it all away. Leftovers are not worth the trouble.",
      "Throw it away now and cook fresh food tomorrow.",
      "Pack the safe leftovers to eat later or share with neighbors, and compost the scraps if you can.",
      "Leave it out overnight in case someone wants it.",
    ],
    correct: 2,
    explanation: "Wasted food also wastes the water, land and energy used to produce it, and rotting food in landfills releases methane. Storing food safely and sharing it is both practical and caring.",
    principle: "Respect for Nature",
    sdgs: [2, 12],
  },
  {
    id: 7,
    title: "Community Cleanliness",
    situation: "You see candy wrappers and bottles on the ground near a park. A bin is about twenty meters away.",
    options: [
      "Walk past. Someone else is paid to clean it.",
      "Complain about it to your friends but do nothing else.",
      "Kick the litter to the side so the path looks clearer.",
      "Safely pick up the items with a bag or glove and put them in the correct bin, and report overflowing bins or hazardous items such as broken glass.",
    ],
    correct: 3,
    explanation: "Litter can wash into drains and waterways and harms wildlife. Small acts in shared spaces show care for the community. Hazardous items should be reported rather than handled unsafely.",
    principle: "Common Good",
    sdgs: [11, 14],
  },
  {
    id: 8,
    title: "Transportation Choices",
    situation: "You need to travel about two kilometers to school or work on a clear day. You could go alone by car, hail a ride, ask a relative to drive you, or use a lower-emission option.",
    options: [
      "Walk, cycle or take shared public transport, when it is safe and practical.",
      "Drive alone, since it is the most convenient.",
      "Book a solo ride-hailing trip.",
      "Ask a relative to make a special trip just for you.",
    ],
    correct: 0,
    explanation: "Short trips by walking, cycling or shared transport produce much less pollution per person. Safety and practicality matter, so the best choice depends on your situation.",
    principle: "Sustainable Development",
    sdgs: [11, 13],
  },
  {
    id: 9,
    title: "Deforestation Awareness",
    situation: "You notice a group cutting mature trees in a protected forest area near your community, and you doubt that they have a permit.",
    options: [
      "Ignore it. It is not your business.",
      "Record what you can safely observe from a distance, and report it to the proper authorities, such as the local government or DENR.",
      "Confront the group aggressively.",
      "Post rumors online without checking facts.",
    ],
    correct: 1,
    explanation: "Forests protect water, store carbon and shelter wildlife. Reporting through proper channels with accurate information is effective and safe. Confrontation can be dangerous, and rumors can harm innocent people.",
    principle: "Environmental Justice",
    sdgs: [15, 16],
  },
  {
    id: 10,
    title: "Community Responsibility",
    situation: "Your class is organizing an environmental clean-up, but few classmates are signing up.",
    options: [
      "Skip it. If few people care, it will not matter.",
      "Complain that no one cares about the environment.",
      "Join, invite friends, and explain clearly what the activity is for and how it helps the community.",
      "Post about the event but do not attend.",
    ],
    correct: 2,
    explanation: "Collective problems need collective action. Leading by example and explaining the purpose with respect tends to encourage others more than blame does.",
    principle: "Intergenerational Responsibility",
    sdgs: [17, 11],
  },
];

export type ResultTier = { min: number; title: string; message: string };

export const resultTiers: ResultTier[] = [
  { min: 9, title: "Environmental Responsibility Champion", message: "You identified the most responsible choice in almost every scenario. Keep sharing these habits with others." },
  { min: 7, title: "Sustainable Thinker", message: "You have a strong grasp of responsible choices. Review the few you missed to build on it." },
  { min: 5, title: "Eco-Aware Learner", message: "You know many of the basics. Reviewing the explanations can help you spot more opportunities for responsible action." },
  { min: 0, title: "Sustainability Explorer", message: "Everyone starts somewhere. Review the explanations and try the challenge again. Learning is the first step." },
];

export function getTier(score: number): ResultTier {
  return resultTiers.find((t) => score >= t.min) ?? resultTiers[resultTiers.length - 1];
}
