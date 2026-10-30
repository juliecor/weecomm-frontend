/**
 * Wee Community Developers, Inc. as its own site (weecomm.ph) states it, pulled on
 * 2026-10-30: the company's words, people, awards, partners and buyer's guide.
 * Nothing here is invented; where the site gives no figure, there is none.
 */

export const COMPANY = {
  name: "Wee Community Developers, Inc.",
  short: "Wee Comm",
  abbreviation: "WCDI",
  tagline: "Beyond Ordinary™",
  /** "From having only one employee in 2008…" */
  founded: 2008,
  intro: "At Wee Comm, we transform spaces into vibrant, sustainable communities designed for a lifetime of comfort and connection. Our commitment goes beyond building homes, we create environments where families thrive and neighborhoods flourish.",
  since: "For over 15 years, Wee Comm has been changing the real estate landscape with Beyond Ordinary™ projects over Metro Manila and across the Philippines.",
  portfolio: "Wee Comm offers a sustainable property portfolio of Beyond Ordinary™ developments in strategic locations.",
  kinds: "Mid-rise and high-rise condominiums, as well as house-and-lot developments across the Philippines.",
  hq: ["166 A. Mabini St., Addition Hills", "San Juan 1500 Metro Manila"],
  phones: ["(02) 866 16794", "(02) 872 45820"],
  email: "inquiries@weecomm.ph",
  hours: "Monday to Friday, 9:00 a.m. to 6:00 p.m.",
  website: "https://weecomm.ph",
  social: {
    facebook: "https://www.facebook.com/officialweecommdevelopersinc",
    instagram: "https://www.instagram.com/theofficialweecomm/",
    linkedin: "https://www.linkedin.com/company/officialweecommdevelopersinc/",
    youtube: "https://www.youtube.com/@officialweecommdevelopersinc",
  },
}

/** The headline figures, each from the site's own text. */
export const STATS = [
  { value: 16, label: "Communities", note: "Metro Manila, Rizal, Iloilo, Cagayan de Oro and Davao" },
  { value: 7, label: "Cities", note: "from San Juan to Davao" },
  { value: "₱8–10B", label: "Reserved sales a year", note: "the company's annual average" },
  { value: 350, suffix: "+", label: "Employees", note: "from one in 2008" },
] as const

export const VISION = "To be the leader of the next phase in Philippine real estate."
export const MISSION = "To build Beyond Ordinary™ developments driven by client satisfaction."
export const PRINCIPLE = [
  "With out-of-the-box thinking at Wee Comm's core, we elevate the potential and creativity of our team. By upholding a culture of fairness and responsibility, we cultivate a strong sense of malasakit, the Filipino value that inspires us to be generously compassionate towards our community. We believe that being intentional in fostering collaboration and support will truly lead us to greater heights.",
  "Our stakeholders not only empower through mentorship but consistently challenge boundaries and approach decisions with prudence, ensuring thoughtful and strategic choices in every endeavor.",
]
export const VALUES = ["Out-of-the-box thinking", "Fairness", "Responsibility", "Malasakit", "Collaboration", "Mentorship", "Prudence"] as const

/** Where the communities are, for the map: city centres (public coordinates), not project addresses. */
export const FOOTPRINT: { city: string; region: string; lat: number; lng: number; projects: number; upcoming?: boolean }[] = [
  { city: "San Juan", region: "Metro Manila", lat: 14.6019, lng: 121.0355, projects: 5 },
  { city: "Mandaluyong", region: "Metro Manila", lat: 14.5794, lng: 121.0359, projects: 2 },
  { city: "Quezon City", region: "Metro Manila", lat: 14.676, lng: 121.0437, projects: 2 },
  { city: "Cainta, Rizal", region: "Luzon", lat: 14.5786, lng: 121.1222, projects: 1 },
  { city: "Iloilo", region: "Visayas", lat: 10.7202, lng: 122.5621, projects: 2 },
  { city: "Cagayan de Oro", region: "Mindanao", lat: 8.4542, lng: 124.6319, projects: 2 },
  { city: "Davao", region: "Mindanao", lat: 7.1907, lng: 125.4553, projects: 2 },
  { city: "Las Piñas", region: "Metro Manila", lat: 14.4445, lng: 120.9939, projects: 0, upcoming: true },
  { city: "Bacolod", region: "Visayas", lat: 10.6765, lng: 122.9509, projects: 0, upcoming: true },
]

/** The region filters, in the order their site uses. */
export const REGIONS = ["Metro Manila", "Luzon", "Visayas", "Mindanao"] as const

/** The Baron signature line in San Juan, oldest first. */
export const SIGNATURE = [
  { slug: "the-first-baron-residences", name: "The First Baron Residences", year: "2010", line: "The pioneer development: 36 exclusive and spacious units that set the tone for Beyond Ordinary homes." },
  { slug: "the-barons-place", name: "The Baron's Place", year: "2013", line: "A few steps from key establishments, it solidified Wee Comm as a developer to watch in San Juan." },
  { slug: "the-baron-3-gardens", name: "The Baron 3 Gardens", year: "2014", line: "Launched one year after The Baron's Place: the first mid-rise, 14 storeys high." },
  { slug: "baron-tower", name: "Baron Tower", year: "2018", line: "30 storeys on Wilson Street, the first Signature Line project, designed by Budji Layug + Royal Pineda Design Architects." },
  { slug: "baron-lvxe", name: "Baron Lvxe", year: "Pre-selling", line: "The fifth addition to the signature line of Baron projects in San Juan." },
]

export type Leader = { name: string; role: string; photo: string; bio: string[] }
export const FOUNDER: Leader = {
  name: "Cesar L. Wee, Jr.",
  role: "Founder and CEO",
  photo: "/weecomm/people/cesar.jpg",
  bio: [
    "Cesar, a graduate of Xavier School and the Ateneo De Manila University, has been in the real estate industry since 1998. He started as a Marketing Manager at family-owned First Marcel Properties, and eventually handled several roles such as General Manager and Vice President for Sales and Marketing.",
    "In 2002, Cesar left the family business to be mentored under the wing of Gerry C. Choa of Property Company of Friends, Inc., one of the biggest real estate developers in the Philippines. He co-developed and conceptualized more than 12 residential projects including the Lancaster New City, a 2000-hectare mega city in Cavite.",
    "In 2007, Cesar spearheaded the family-owned W Group's foray into Bonifacio Global City with the W Tower. From having only one employee in 2008, Wee Comm now has a dynamic and collaborative family of more than 350 employees. Cesar credits its growth to the company's mentorship program, where he mentors joint venture partners who help make sure projects are always unique and delivered on time.",
    "Cesar is a Director in the Organization of Socialized Housing Developers of the Philippines, the Urban Land Institute, and Junior Chamber International Philippines San Juan, and was an investor judge in CNN's The Final Pitch Season 5.",
  ],
}
export const LEADERS: Leader[] = [
  {
    name: "Carson T. Choa",
    role: "Chief Operating Officer",
    photo: "/weecomm/people/carson.jpg",
    bio: [
      "As Chief Operating Officer, Carson serves as a dynamic force behind the company's rapid expansion and evolving footprint across the Philippines. With the precision of a strategist and the heart of a builder, Carson leads the charge in transforming bold ideas into remarkable developments.",
      "Deeply aligned with Wee Comm's Beyond Ordinary™ philosophy, Carson is relentless in his pursuit of innovation. Under his leadership, each project is not just built, but thoughtfully crafted to deliver long-term value to homeowners, investors, and the communities they serve.",
    ],
  },
  { name: "Carvin", role: "Vice President for Finance · Area Head, Iloilo", photo: "/weecomm/people/carvin.jpg", bio: ["He leads with an inspired and artistic perspective, full of joy and compassion for the people under his charge. This is balanced with his ability to lead with fueled resolve and direction, putting visionary ideas into action and innovating with every project."] },
  { name: "Carter", role: "Vice President for Architecture and Engineering · Area Head, Cagayan de Oro", photo: "/weecomm/people/carter.jpg", bio: ["As an intellectual and analytical leader, he leads with calculated precision to achieve the best results. He charges each project with tenacity and determination, working twice as hard with the people he leads."] },
  { name: "Carlo", role: "Vice President for Sales · Area Head and Area Sales Head, Davao", photo: "/weecomm/people/carlo.jpg", bio: ["He is a consistent and reliable leader, keeping his team stable and assured through whatever challenge they may face. His calm confidence as a leader reflects on his team's abilities and potential."] },
]

export const AWARDS = [
  { year: "2025", title: "Thought Leader of the Year", by: "Asia-Pacific Stevie® Awards · Silver", logo: "/weecomm/awards/thought-leader.png" },
  { year: "2025", title: "Asia's Leader of Influence in Condominium Development", by: "Asia's Influential Leader Awards", logo: "/weecomm/awards/asia-leader.png" },
  { year: "2025", title: "Asia's Golden Icon Awards", by: "awardee" },
  { year: "2023 · 2024", title: "The Outlook: Philippine Real Estate Awards", by: "Lamudi", logo: "/weecomm/awards/wcdi-2024.png" },
  { year: "2024", title: "CEO of the Year, nominee", by: "Asia CEO Awards" },
  { year: "2020", title: "Nine major awards, the most by any developer that year", by: "Philippine Property Awards: Best Breakthrough Developer, Best Housing Developer (Visayas and Mindanao), Best Affordable Condominium (Metro Manila)", logo: "/weecomm/awards/property-guru.jpg" },
  { year: "2020", title: "Best Affordable Condo Development, Metro Manila", by: "8th PropertyGuru Philippines Property Awards, for Harbour Park Residences" },
]

export const PARTNERS = [
  { name: "Davao Southprime Developers, Inc.", short: "DSDI", where: "Davao" },
  { name: "Iloilo Southprime Developers, Inc.", where: "Iloilo" },
  { name: "Metro Worx Properties Inc.", with: "Arcya Commercial Corporation", logo: "/weecomm/partners/metroworx.jpg" },
  { name: "Wee Comm Magnum Properties, Inc.", with: "Magnum Group", logo: "/weecomm/partners/magnum.png" },
  { name: "Magnahomes, Inc.", with: "Magnum Group" },
]

export const NEWS = [
  { date: "July 31, 2025", title: "Mr. Cesar Wee Jr. receives the Stevie® Award for Thought Leader of the Year", photo: "/weecomm/site/stevie.jpg" },
  { date: "March 5, 2025", title: "Modern Tao Ke: 6 must-know business tips from real estate mogul Cesar Wee", photo: "/weecomm/site/final-pitch.jpg" },
  { date: "March 5, 2025", title: "Unusual Developments: Cesar Wee", photo: "/weecomm/site/office-client.jpg" },
  { date: "2025", title: "ASCEND: The 6th National Wee Comm Awards", photo: "/weecomm/site/events-1.jpg" },
]

/** The buyer's guide, from the site's FAQs. */
export const GUIDE = {
  reservation: {
    requirements: [
      "Proof of Reservation Fee (RF)",
      "Signed Reservation Agreement (RA)",
      "Signed Package Computation of your preferred unit or property (Annex A of the RA)",
      "Signed Standard Documentary Requirements Checklist (Annex B of the RA)",
      "Signed Buyer's Information Sheet (BIS)",
      "Photocopy of 2 valid government-issued IDs with signature",
      "For OFW or international buyers: details of the Attorney-in-Fact with their IDs, and a photocopy of your passport",
    ],
    timeline: [
      { step: "Reserve", text: "Pick your unit and submit the reservation requirements. The application is processed once they are complete." },
      { step: "Evaluation", text: "The Documentation Department assesses the application. Additional requirements, if any: 3 calendar days for local buyers, 7 for OFW or international buyers." },
      { step: "Welcome", text: "On approval you receive a Welcome Letter or a call from the Client Management Department." },
      { step: "Counseling", text: "A counseling session within 15 days of the approved reservation explains the policies, guidelines and your responsibilities." },
      { step: "Documents", text: "Complete the documentary requirements within 30 calendar days (locally employed) or 60 (OFW or international)." },
      { step: "Contracts", text: "The Contract to Sell, Deed of Absolute Sale and, where applicable, the Home Improvement Contract are prepared; you have 15 calendar days to review, sign and return them." },
    ],
    cancellation: [
      "Not attending counseling within 15 days of the approved reservation",
      "Not paying the first equity or down payment",
      "Missing any three consecutive monthly installments or amortizations",
      "Not completing the documentary requirements within 30 days (local) or 60 days (OFW or international)",
      "Misrepresentation or falsified documents",
      "Voluntary withdrawal from the Reservation Agreement or Contract to Sell",
    ],
  },
  terms: [
    { name: "Spot cash", text: "The full Total Contract Price is paid in cash 30 days after the reservation date." },
    { name: "Deferred", text: "The full Total Contract Price is paid throughout the equity period." },
    { name: "Standard", text: "The net equity is divided equally over the equity period, and the remaining balance is paid at the end of the term in cash, through a financing institution or an in-house loan." },
  ],
  payments: {
    recurring: ["Post-dated checks (PDCs)", "Auto-debit arrangement with BDO (ADA)"],
    oneTime: ["BDO Bills Payment", "Over-the-counter bills payment, cash or check", "BDO Mobile App", "BDO Online Banking", "Check", "Cash"],
    ofw: "OFW or overseas-based buyers designate a family member in the Philippines as Attorney-in-Fact, who can apply for the ADA facility or issue the post-dated checks.",
  },
  financing: {
    banks: ["BDO", "Security Bank", "BPI", "RCBC", "PNB", "China Bank", "AUB", "Yuanta Savings Bank", "Union Bank"],
    bank: "A loan application with its requirements goes to an accredited bank, ideally six months before the end of the equity period. The bank issues a Notice of Approval, then a Letter of Guarantee; the loan is normally released within 7 working days of the signed Letter of Guarantee and the post-approval requirements.",
    pagibig: "A fully accomplished Pag-IBIG Housing Application Form with its documents, preferably six months before the end of the equity period. Documents must be original or certified true copies.",
    inHouse: "An in-house loan covers up to 80% of the total contract price, payable for up to 10 years. The down payment and the first 5 years of monthly amortization are covered by post-dated checks or the BDO ADA facility.",
    inHouseRates: [
      { term: "10 years", rate: "20%" },
      { term: "5 years", rate: "18%" },
      { term: "3 years", rate: "16%" },
      { term: "1 year", rate: "12%" },
    ],
  },
  fees: [
    { name: "Late payment", text: "3% of the outstanding payment, charged in full if a payment is not received on or before its monthly due date." },
    { name: "Transfer of unit", text: "₱50,000, deducted from the equity paid, when a transfer is approved; no fee within 7 calendar days of the reservation. One transfer per individual sale." },
    { name: "Holding or pulling out a check", text: "₱100 per post-dated check, by request at least 7 working days before the due date; twice at most over the equity period." },
    { name: "Statement of account", text: "Sent to your registered email every quarter." },
  ],
  documents: {
    personal: ["Proof of billing address (latest statement)", "Birth certificate", "Certificate of No Marriage, or marriage certificate", "Tax Identification Number (TIN)", "Special Power of Attorney where applicable"],
    employed: ["Certificate of Employment with salary breakdown", "Payslips for at least 6 months", "Latest Income Tax Return with receipt", "Bank statements for at least 6 months"],
    selfEmployed: ["Income Tax Returns with receipts for the last 3 years", "Audited financial statements for the last 3 years", "Business permit", "DTI certificate of registration"],
    ofw: ["Certificate of employment or job contract with salary breakdown", "Special Power of Attorney, consularized if executed abroad", "Passport with arrival date", "Attorney-in-Fact's IDs and proof of billing", "Proof of remittance for at least 6 months"],
  },
}

/** The opening slides: the company's own facade photos. */
export const HERO_SLIDES = [
  { src: "/weecomm/projects/baron-lvxe/2.jpg", caption: "Baron Lvxe, San Juan" },
  { src: "/weecomm/projects/calle-centrale/3.jpg", caption: "Calle Centrale, Quezon City" },
  { src: "/weecomm/projects/baron-tower/1.jpg", caption: "Baron Tower, San Juan" },
  { src: "/weecomm/projects/harbour-park-residences/2.jpg", caption: "Harbour Park Residences, Mandaluyong" },
]
