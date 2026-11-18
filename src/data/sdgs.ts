export type Sdg = {
  n: number;
  title: string;
  official: string;
  color: string;
  /** true when white text is not legible on the colour */
  dark?: boolean;
  env: boolean;
  short: string;
  envLink: string;
  action: string;
  why: string;
  challenges: string[];
  actions: string[];
  related: number[];
};

/** Official SDG names, numbers and colours (UN). Goal statements paraphrase sdgs.un.org/goals. */
export const sdgs: Sdg[] = [
  {
    n: 1, title: "No Poverty", official: "End poverty in all its forms everywhere", color: "#E5243B", env: false,
    short: "Making sure everyone has the means to meet basic needs and live with dignity.",
    envLink: "People living in poverty are often the most exposed to floods, drought and pollution, and have the fewest resources to recover.",
    action: "Donate usable items instead of throwing them away.",
    why: "Poverty limits access to food, shelter, health and education. Reducing it makes communities more resilient to environmental shocks.",
    challenges: ["Families in hazard-prone areas have fewer ways to recover after disasters.", "Lack of secure income pushes some people toward unsustainable use of local resources."],
    actions: ["Buy from fair local businesses.", "Donate or share items you no longer use.", "Volunteer in community programs."],
    related: [2, 8, 10, 13],
  },
  {
    n: 2, title: "Zero Hunger", official: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture", color: "#DDA63A", dark: true, env: false,
    short: "Ending hunger and promoting sustainable farming so everyone can eat well.",
    envLink: "Farming depends on healthy soil, water and stable weather, and unsustainable practices can damage all three.",
    action: "Plan meals and store food well to reduce food waste.",
    why: "Food systems feed people but also use land and water and produce emissions. Sustainable agriculture protects both food supply and ecosystems.",
    challenges: ["Climate change affects crop yields and growing seasons.", "Large amounts of food are lost or wasted before they reach a plate."],
    actions: ["Cook only what you will eat and use leftovers.", "Compost food scraps where possible.", "Support local and seasonal produce."],
    related: [12, 13, 15, 1],
  },
  {
    n: 3, title: "Good Health and Well-Being", official: "Ensure healthy lives and promote well-being for all at all ages", color: "#4C9F38", env: false,
    short: "Healthy lives and well-being for people of every age.",
    envLink: "Polluted air, unsafe water and poor waste management directly affect human health.",
    action: "Avoid burning waste and choose walking or cycling for short trips.",
    why: "Health depends on clean air, safe water and healthy surroundings, so environmental care is also health care.",
    challenges: ["Air pollution contributes to respiratory illness.", "Unsafe water and poor sanitation spread disease."],
    actions: ["Never burn trash.", "Walk or cycle short distances.", "Keep drains and surroundings clean to reduce disease-carrying pests."],
    related: [6, 11, 13, 12],
  },
  {
    n: 4, title: "Quality Education", official: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all", color: "#C5192D", env: false,
    short: "Inclusive, quality education and lifelong learning for all.",
    envLink: "Education builds the knowledge and values people need to care for the environment and adopt sustainable habits.",
    action: "Share what you learn about sustainability with classmates and family.",
    why: "Informed people make better choices and can teach others. Education is how awareness becomes lasting behavior.",
    challenges: ["Environmental topics are not always taught in practical, relatable ways.", "Not every learner has equal access to quality education."],
    actions: ["Organize a short talk or poster about a local environmental issue.", "Use digital documents instead of unnecessary printing.", "Join school eco-clubs."],
    related: [12, 13, 17, 10],
  },
  {
    n: 5, title: "Gender Equality", official: "Achieve gender equality and empower all women and girls", color: "#FF3A21", env: false,
    short: "Equal rights and opportunities for women and girls.",
    envLink: "Women often manage household water, food and energy, and their leadership strengthens community environmental decisions.",
    action: "Make sure everyone's voice is heard in community clean-up planning.",
    why: "Sustainable development works better when everyone can take part in decisions that affect shared resources.",
    challenges: ["Women and girls can be disproportionately affected when water or fuel is scarce.", "Their participation in environmental decision-making is often limited."],
    actions: ["Support inclusive leadership in school and community projects.", "Share responsibilities for household sustainability fairly.", "Amplify environmental voices from underrepresented groups."],
    related: [4, 10, 6, 7],
  },
  {
    n: 6, title: "Clean Water and Sanitation", official: "Ensure availability and sustainable management of water and sanitation for all", color: "#26BDE2", env: true,
    short: "Safe water and sanitation, managed sustainably, for everyone.",
    envLink: "Water pollution and wasteful use damage rivers, lakes and groundwater that communities depend on.",
    action: "Turn off taps while brushing and report leaks.",
    why: "Clean water is essential for health, farming and ecosystems. It is a shared resource that must be protected.",
    challenges: ["Waste and chemicals pollute waterways.", "Leaks and overuse strain supply, especially during dry periods."],
    actions: ["Fix or report leaking taps.", "Keep litter out of drains and waterways.", "Use only the water you need."],
    related: [3, 12, 14, 15],
  },
  {
    n: 7, title: "Affordable and Clean Energy", official: "Ensure access to affordable, reliable, sustainable and modern energy for all", color: "#FCC30B", dark: true, env: true,
    short: "Reliable, affordable and sustainable energy for all.",
    envLink: "Energy from fossil fuels is a major source of greenhouse gas emissions, so using less and using cleaner sources matters.",
    action: "Switch off lights, fans and devices you are not using.",
    why: "Energy powers homes, schools and businesses. Shifting to efficient and renewable sources reduces emissions while keeping energy accessible.",
    challenges: ["Many places still depend heavily on fossil fuels.", "Access to affordable clean energy is uneven."],
    actions: ["Unplug chargers and turn off idle equipment.", "Use natural light and ventilation when possible.", "Choose energy-efficient appliances when buying."],
    related: [13, 9, 11, 12],
  },
  {
    n: 8, title: "Decent Work and Economic Growth", official: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all", color: "#A21942", env: false,
    short: "Good jobs and economic growth that do not come at the planet's expense.",
    envLink: "Economic activity depends on natural resources, so growth must be sustainable to last.",
    action: "Support businesses that treat workers fairly and reduce waste.",
    why: "Decent work supports families and communities, and green jobs show that livelihoods and the environment can go together.",
    challenges: ["Some industries damage the environment or exploit workers.", "The shift to sustainable industries requires new skills."],
    actions: ["Choose responsible brands and local producers.", "Learn about green careers.", "Repair and reuse before replacing."],
    related: [1, 9, 12, 10],
  },
  {
    n: 9, title: "Industry, Innovation and Infrastructure", official: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation", color: "#FD6925", env: false,
    short: "Resilient infrastructure, inclusive industry and innovation.",
    envLink: "Cleaner technologies and well-designed infrastructure can cut pollution and help communities withstand climate impacts.",
    action: "Support and use public infrastructure such as shared transport and recycling facilities.",
    why: "Roads, power, water systems and technology shape how much resource a society uses and how well it copes with shocks.",
    challenges: ["Older industrial processes can be wasteful and polluting.", "Infrastructure may not withstand stronger storms."],
    actions: ["Use shared transport and public facilities.", "Be curious about local innovations in clean technology.", "Report damaged public infrastructure like broken drainage."],
    related: [7, 11, 13, 8],
  },
  {
    n: 10, title: "Reduced Inequalities", official: "Reduce inequality within and among countries", color: "#DD1367", env: false,
    short: "Reducing inequality within and among countries.",
    envLink: "Environmental burdens such as pollution and disaster risk often fall hardest on disadvantaged communities.",
    action: "Speak up when environmental problems affect vulnerable neighbors.",
    why: "Fair access to clean surroundings and resources is part of environmental justice.",
    challenges: ["Polluting facilities and waste sites are often located near poorer communities.", "Climate adaptation resources are unevenly distributed."],
    actions: ["Include everyone in clean-up and awareness drives.", "Share information in clear, accessible language.", "Support community-led environmental projects."],
    related: [1, 5, 13, 16],
  },
  {
    n: 11, title: "Sustainable Cities and Communities", official: "Make cities and human settlements inclusive, safe, resilient and sustainable", color: "#FD9D24", dark: true, env: true,
    short: "Inclusive, safe, resilient and sustainable cities and communities.",
    envLink: "Waste, traffic, air quality and green space in towns and cities shape daily environmental conditions.",
    action: "Keep public spaces clean and segregate waste properly.",
    why: "Most people live in towns and cities, so how these places handle waste, transport and green space has large effects.",
    challenges: ["Waste collection and drainage can be overwhelmed.", "Traffic and limited green space affect air quality and comfort."],
    actions: ["Dispose of waste in the proper bins.", "Take part in community clean-ups.", "Walk, cycle or use public transport when practical."],
    related: [12, 13, 9, 3],
  },
  {
    n: 12, title: "Responsible Consumption and Production", official: "Ensure sustainable consumption and production patterns", color: "#BF8B2E", dark: true, env: true,
    short: "Using resources wisely and producing goods with less waste.",
    envLink: "Everything we buy uses materials and energy and eventually becomes waste.",
    action: "Refuse unnecessary single-use items and reuse what you own.",
    why: "Reducing waste and choosing durable, responsible products lowers pressure on resources and on landfills.",
    challenges: ["Single-use products create large volumes of waste.", "Fast consumption cycles encourage over-buying."],
    actions: ["Bring reusable bottles, bags and containers.", "Buy only what you need and repair what you can.", "Segregate and recycle waste correctly."],
    related: [11, 13, 14, 6],
  },
  {
    n: 13, title: "Climate Action", official: "Take urgent action to combat climate change and its impacts", color: "#3F7E44", env: true,
    short: "Urgent action to combat climate change and its impacts.",
    envLink: "Rising greenhouse gas levels from human activity are changing weather patterns, sea levels and ecosystems.",
    action: "Save energy and choose lower-emission transport.",
    why: "Climate change affects water, food, health and safety, so slowing it and preparing for its effects protects everything else.",
    challenges: ["More intense storms, heat and drought in many regions.", "Communities need both emission cuts and adaptation."],
    actions: ["Use less electricity and avoid wasteful travel.", "Plant and protect trees.", "Talk about climate action with friends and family."],
    related: [7, 11, 12, 15],
  },
  {
    n: 14, title: "Life Below Water", official: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development", color: "#0A97D9", env: true,
    short: "Protecting oceans, seas and marine life.",
    envLink: "Plastic and other waste from land can end up in waterways and the sea, harming marine animals and habitats.",
    action: "Never leave litter near drains, rivers or shorelines.",
    why: "Oceans regulate climate, provide food and support livelihoods, and they are affected by what we do on land.",
    challenges: ["Plastic pollution harms marine life.", "Overfishing and habitat damage reduce ocean health."],
    actions: ["Reduce single-use plastic.", "Join shoreline or river clean-ups.", "Choose seafood from responsible sources."],
    related: [6, 12, 13, 15],
  },
  {
    n: 15, title: "Life on Land", official: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss", color: "#56C02B", dark: true, env: true,
    short: "Protecting forests, land ecosystems and biodiversity.",
    envLink: "Forests and other ecosystems store carbon, protect water sources and are home to countless species.",
    action: "Plant native trees and never support illegal logging.",
    why: "Healthy land ecosystems support clean water, stable climate and food production, and are habitats for wildlife.",
    challenges: ["Forests are cleared for land and timber.", "Habitat loss pushes many species toward extinction."],
    actions: ["Plant and care for native trees.", "Avoid products linked to illegal logging.", "Report illegal cutting or wildlife trade to authorities."],
    related: [13, 6, 2, 12],
  },
  {
    n: 16, title: "Peace, Justice and Strong Institutions", official: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels", color: "#00689D", env: false,
    short: "Peaceful, inclusive societies with fair and accountable institutions.",
    envLink: "Environmental laws only protect nature when they are fairly enforced and people can safely report violations.",
    action: "Report environmental violations through proper channels.",
    why: "Accountable institutions make sure environmental rules are followed and that communities can take part in decisions.",
    challenges: ["Weak enforcement allows illegal dumping and logging.", "People may lack access to information or a safe way to report."],
    actions: ["Learn local environmental rules.", "Report violations to the right office.", "Take part in public consultations."],
    related: [10, 15, 17, 11],
  },
  {
    n: 17, title: "Partnerships for the Goals", official: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development", color: "#19486A", env: false,
    short: "Working together across governments, businesses, schools and people.",
    envLink: "Environmental problems cross borders and sectors, so lasting solutions need cooperation.",
    action: "Join or start a group that works on an environmental cause.",
    why: "No single person or organization can reach all the goals alone. Partnerships share knowledge, resources and responsibility.",
    challenges: ["Efforts can be fragmented and uncoordinated.", "Resources and technology are unevenly shared."],
    actions: ["Team up with classmates, schools and local groups.", "Share what works with others.", "Support community and school sustainability programs."],
    related: [4, 16, 13, 12],
  },
];

export const ENV_SDG_NUMBERS = [6, 7, 11, 12, 13, 14, 15];

export function getSdg(n: number): Sdg | undefined {
  return sdgs.find((s) => s.n === n);
}
