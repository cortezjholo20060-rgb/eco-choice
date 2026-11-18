import type { LucideIcon } from "lucide-react";
import { Recycle, CloudSun, TreePine, Droplets, Wind, Fish, Trash2, ShoppingBag } from "lucide-react";

export type Issue = {
  id: string;
  title: string;
  icon: LucideIcon;
  /** Tailwind gradient classes for the illustration tile */
  tile: string;
  summary: string;
  meaning: string;
  causes: string[];
  effects: string[];
  social: string[];
  ethics: string;
  solutions: string[];
  action: string;
  sdgs: number[];
};

export const issues: Issue[] = [
  {
    id: "plastic-pollution", title: "Plastic Pollution", icon: Recycle, tile: "from-sky to-nature",
    summary: "Plastic is durable, so discarded items can persist for a very long time and spread through land and water.",
    meaning: "Plastic pollution is the build-up of plastic waste in the environment, from large items to tiny fragments called microplastics.",
    causes: ["Heavy use of single-use items such as bottles, bags and wrappers", "Waste that is not collected, sorted or recycled", "Litter that washes into drains, rivers and the sea"],
    effects: ["Animals can become entangled in or swallow plastic", "Plastic breaks into small pieces that spread through soil and water", "Clogged drains can worsen flooding"],
    social: ["Clean-up costs fall on communities", "Livelihoods such as fishing and tourism can suffer"],
    ethics: "Convenience for one person should not become a burden for ecosystems and other people. Reducing waste at the source is a shared responsibility.",
    solutions: ["Refuse unnecessary single-use items", "Carry a reusable bottle, bag and container", "Segregate waste and support proper collection"],
    action: "Carry a reusable bottle and bag.",
    sdgs: [12, 14, 6],
  },
  {
    id: "climate-change", title: "Climate Change", icon: CloudSun, tile: "from-earth to-sky",
    summary: "Human activity, mainly burning fossil fuels, is changing the climate, with effects on weather, water and ecosystems.",
    meaning: "Climate change is a long-term shift in temperatures and weather patterns. Scientific bodies including NASA and the UN identify human activities, mainly burning fossil fuels, as the main driver of recent change.",
    causes: ["Burning coal, oil and gas for energy and transport", "Deforestation, which reduces carbon storage", "Some industrial and agricultural practices"],
    effects: ["More intense heat, storms and drought in many regions", "Rising sea levels that threaten coastal areas", "Changes in ecosystems and growing seasons"],
    social: ["Disasters displace families and damage livelihoods", "Vulnerable communities are often affected most"],
    ethics: "Because the effects reach people far away and future generations, reducing emissions is a matter of fairness and intergenerational responsibility.",
    solutions: ["Use energy efficiently and support clean energy", "Choose lower-emission transport when practical", "Protect forests and plant trees"],
    action: "Save electricity and choose lower-emission transport.",
    sdgs: [13, 7, 11],
  },
  {
    id: "deforestation", title: "Deforestation", icon: TreePine, tile: "from-nature to-deep",
    summary: "Clearing forests removes habitats, weakens soil and reduces the planet's ability to store carbon.",
    meaning: "Deforestation is the permanent removal of forest, usually to make way for farming, settlements, mining or logging.",
    causes: ["Land clearing for agriculture and development", "Illegal or unsustainable logging", "Forest fires and mining"],
    effects: ["Loss of habitat and biodiversity", "Soil erosion and higher risk of landslides and floods", "Less carbon stored in trees"],
    social: ["Communities that depend on forests lose resources", "Watersheds that supply drinking water can be damaged"],
    ethics: "Forests are a shared inheritance. Protecting them respects nature and the people who depend on it.",
    solutions: ["Plant and care for native trees", "Choose responsibly sourced paper and wood products", "Report illegal cutting to the proper authorities"],
    action: "Plant native trees and avoid products linked to illegal logging.",
    sdgs: [15, 13, 6],
  },
  {
    id: "water-pollution", title: "Water Pollution", icon: Droplets, tile: "from-sky to-forest",
    summary: "Waste and chemicals that enter waterways harm ecosystems and can make water unsafe.",
    meaning: "Water pollution happens when harmful substances such as waste, sewage or chemicals contaminate rivers, lakes, groundwater and the sea.",
    causes: ["Untreated sewage and household wastewater", "Litter and dumping in drains and waterways", "Runoff from farms, industry and roads"],
    effects: ["Harm to fish, plants and other aquatic life", "Contaminated drinking and bathing water", "Loss of healthy waterways"],
    social: ["Risk of waterborne illness", "Reduced income for fishing and water-dependent livelihoods"],
    ethics: "Clean water is essential to life. Polluting it harms others who share the same source.",
    solutions: ["Keep litter and oils out of drains", "Use water wisely and fix leaks", "Support wastewater treatment and clean-ups"],
    action: "Never dump waste in drains or waterways.",
    sdgs: [6, 14, 3],
  },
  {
    id: "air-pollution", title: "Air Pollution", icon: Wind, tile: "from-sage to-sky",
    summary: "Smoke, exhaust and fumes reduce air quality and affect health.",
    meaning: "Air pollution is the presence of harmful substances such as smoke, dust and exhaust fumes in the air we breathe.",
    causes: ["Vehicle exhaust and fuel burning", "Industrial emissions", "Open burning of waste"],
    effects: ["Reduced air quality and visibility", "Damage to plants and ecosystems", "Contribution to climate change from some pollutants"],
    social: ["Respiratory and heart problems", "Children, older adults and people with existing conditions are more at risk"],
    ethics: "Everyone has an interest in breathable air. Actions that pollute it impose costs on neighbors.",
    solutions: ["Walk, cycle or share rides", "Never burn trash", "Keep vehicles maintained and avoid idling"],
    action: "Walk or cycle short distances and never burn waste.",
    sdgs: [3, 11, 13],
  },
  {
    id: "biodiversity-loss", title: "Biodiversity Loss", icon: Fish, tile: "from-nature to-sky",
    summary: "When habitats shrink, the variety of living things that keep ecosystems healthy declines.",
    meaning: "Biodiversity is the variety of life on Earth, including plants, animals and ecosystems. Biodiversity loss is the decline of that variety.",
    causes: ["Habitat destruction", "Pollution and climate change", "Over-harvesting and illegal wildlife trade"],
    effects: ["Species decline or disappear", "Weakened ecosystems that provide food, water and clean air", "Less resilience to change"],
    social: ["Communities that rely on natural resources are affected", "Loss of cultural and recreational value"],
    ethics: "Living things have value beyond their usefulness to us, and we hold a duty to avoid causing their loss.",
    solutions: ["Protect habitats and plant native species", "Never buy products from illegal wildlife trade", "Support conservation education"],
    action: "Protect local habitats and plant native species.",
    sdgs: [14, 15, 12],
  },
  {
    id: "waste-management", title: "Improper Waste Management", icon: Trash2, tile: "from-earth to-forest",
    summary: "Waste that is dumped, burned or mixed together pollutes land, water and air.",
    meaning: "Improper waste management means collecting, sorting or disposing of waste in ways that harm people or the environment.",
    causes: ["Mixed waste with no segregation", "Illegal dumping and open burning", "Not enough collection or recycling facilities"],
    effects: ["Pollution of soil, water and air", "Clogged drains and flooding", "Methane released from decomposing waste"],
    social: ["Health risks near dumps", "Costs and nuisance for neighborhoods"],
    ethics: "Dealing with our waste responsibly is part of respecting the community that shares our space.",
    solutions: ["Segregate waste at the source", "Compost food scraps where possible", "Support proper collection and recycling"],
    action: "Segregate waste into the correct bins.",
    sdgs: [11, 12, 3],
  },
  {
    id: "unsustainable-consumption", title: "Unsustainable Consumption", icon: ShoppingBag, tile: "from-sage to-earth",
    summary: "Buying and discarding more than we need uses up resources and creates waste.",
    meaning: "Unsustainable consumption means using goods and resources faster than they can be replaced or managed responsibly.",
    causes: ["Over-buying and fast replacement of products", "Products designed for short use", "Excess packaging"],
    effects: ["Greater demand for raw materials and energy", "More waste and emissions", "Pressure on ecosystems"],
    social: ["Unequal sharing of resources", "Pollution burdens in communities near production and disposal sites"],
    ethics: "Taking more than we need affects others and future generations. Mindful consumption is an expression of fairness.",
    solutions: ["Ask whether you need an item before buying", "Repair, reuse and share", "Choose durable and responsibly made products"],
    action: "Pause before buying and choose to repair or reuse first.",
    sdgs: [12, 13, 8],
  },
];

export type SmallChoice = { title: string; text: string; sdgs: number[] };

export const smallChoices: SmallChoice[] = [
  { title: "Use reusable containers", text: "Bringing your own bottle, bag or lunch box cuts the single-use waste you create each week.", sdgs: [12, 14] },
  { title: "Conserve water", text: "Turning off the tap while brushing and reporting leaks saves a shared resource.", sdgs: [6] },
  { title: "Switch off unused lights", text: "Saving electricity reduces demand on energy sources that produce emissions.", sdgs: [7, 13] },
  { title: "Segregate your waste", text: "Sorting at the source makes composting and recycling possible.", sdgs: [11, 12] },
  { title: "Avoid unnecessary purchases", text: "Every item uses materials and energy. Buying only what you need lowers that footprint.", sdgs: [12] },
  { title: "Choose sustainable transport", text: "Walking, cycling and shared rides on short trips cut air pollution and emissions.", sdgs: [11, 13] },
];

export const whatCanWeDo: { title: string; text: string }[] = [
  { title: "Reduce first", text: "Refusing what you do not need prevents waste before it exists." },
  { title: "Reuse and repair", text: "Extend the life of bottles, bags, clothes and gadgets." },
  { title: "Segregate and recycle", text: "Follow local rules for sorting so materials can be recovered." },
  { title: "Save water and energy", text: "Fix leaks, switch off idle devices and use natural light." },
  { title: "Move wisely", text: "Choose walking, cycling or shared transport when it is safe and practical." },
  { title: "Care for green spaces", text: "Plant native trees, join clean-ups and keep public spaces tidy." },
  { title: "Learn and share", text: "Talk to classmates, family and neighbors about what you learn." },
  { title: "Speak up properly", text: "Report violations such as illegal dumping or logging to the right authorities." },
];
