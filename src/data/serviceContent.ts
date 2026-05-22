export interface ServiceContent {
  slug: string;
  title: string;
  subtitle: string;
  heroDesc: string;
  overview: string;
  whenToCall: string[];
  howItWorks: Array<{ step: string; title: string; desc: string }>;
  safetyPromise: string;
  relatedSlugs: string[];
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'tree-removal': {
    slug: 'tree-removal',
    title: 'Tree Removal',
    subtitle: 'Safe removal for dead, leaning, storm-damaged, oversized, or property-risk trees.',
    heroDesc: 'Heavy-duty removal for oversized, leaning, dead, or hazardous trees near homes and structures.',
    overview: "Whether it's a dying oak threatening your roofline or a storm-split maple that needs to come down before it falls, Heavy Tree Service handles removals of every size. We use commercial rigging and equipment built for Pittsburgh terrain — protecting your property, driveway, fence, and landscaping through every stage.",
    whenToCall: [
      'Dead or dying trees with significant trunk decay or fungus',
      'Trees leaning toward structures, driveways, or power lines',
      'Storm-damaged trunks with large cracks or split unions',
      'Oversized trees in tight-access backyards',
      'Trees with root damage from excavation or soil shift',
      'Multiple trees removed as part of lot clearing or renovation',
    ],
    howItWorks: [
      { step: '01', title: 'Site Assessment', desc: 'We inspect the tree, access points, hazards, and target zone. Every removal is planned before equipment arrives.' },
      { step: '02', title: 'Rigging Setup', desc: 'Cables, ropes, and safety lines placed. Branches sectioned and lowered — nothing free-falls near your property.' },
      { step: '03', title: 'Controlled Removal', desc: 'Tree taken down in sections using precision cuts. Crew positions every piece for cleanup efficiency.' },
      { step: '04', title: 'Site Cleanup', desc: 'Logs cut, brush chipped, debris hauled. Your property is left clean and safe — no surprises.' },
    ],
    safetyPromise: "Every removal is done with full liability insurance and workers' comp. We protect your property like it's our own — no shortcuts, no unnecessary risk.",
    relatedSlugs: ['storm-cleanup', 'stump-grinding', 'tree-pruning'],
  },
  'storm-cleanup': {
    slug: 'storm-cleanup',
    title: 'Emergency Storm Cleanup',
    subtitle: 'Fast response for storm-downed trees, broken limbs, blocked access, and urgent cleanup.',
    heroDesc: 'Fast response for fallen limbs, blocked driveways, roof-risk trees, and post-storm debris.',
    overview: 'When a storm rolls through Western PA, trees come down fast. Heavy Tree Service provides 24/7 emergency response for downed trees, split trunks, hanging limbs, and debris blocking driveways, roads, and access to your home. We arrive fast, work safely, and clean up completely.',
    whenToCall: [
      'Tree or limb on roof, deck, fence, or vehicle',
      'Downed trees blocking driveway or roadway access',
      'Hanging limbs after severe weather',
      'Storm-split trunks with partial root failure',
      'Entire property covered in debris after high winds',
      'Any tree situation that feels urgent or unsafe',
    ],
    howItWorks: [
      { step: '01', title: 'Call Us', desc: 'Call (412) 805-2662 — day or night. We answer live and dispatch fast. No answering service, no delays.' },
      { step: '02', title: 'Rapid Response', desc: 'Crew arrives with chainsaws, rigging, and a chipper. We assess the hazard and get to work immediately.' },
      { step: '03', title: 'Hazard Removal', desc: 'Dangerous trees and limbs removed first. Roofs cleared, driveways opened, structures secured.' },
      { step: '04', title: 'Full Cleanup', desc: 'Debris hauled, yard raked, site left clean. No piles left behind — we handle every piece.' },
    ],
    safetyPromise: "Available 24/7, 365 days a year. No emergency surcharge on most calls. We're here when you need us most.",
    relatedSlugs: ['tree-removal', 'stump-grinding', 'land-clearing'],
  },
  'stump-grinding': {
    slug: 'stump-grinding',
    title: 'Stump Grinding',
    subtitle: 'Grind stumps below grade and restore a clean, usable yard.',
    heroDesc: 'Below-grade stump elimination so the yard is clean, level, and ready to plant.',
    overview: "After a tree comes down, the stump stays — and it's an eyesore, a tripping hazard, and a pest magnet. Heavy Tree Service uses commercial stump grinding equipment to grind stumps below grade, eliminating regrowth and leaving clean, level ground ready for sod, seed, or landscaping.",
    whenToCall: [
      'Stumps left from previous tree work or storm damage',
      'Multiple stumps in a yard you want to reclaim',
      'Stumps near walkways, driveways, or play areas',
      'Stump regrowth or sucker sprouts becoming a nuisance',
      'Preparing a yard for new landscaping or construction',
    ],
    howItWorks: [
      { step: '01', title: 'Grind Setup', desc: 'We position the grinder for safe access and clear the area around the stump.' },
      { step: '02', title: 'Below-Grade Grind', desc: 'The stump is ground down to below surface level — no trace left, no regrowth.' },
      { step: '03', title: 'Debris Removal', desc: 'Chips and sawdust cleared. You choose: chips left as mulch or hauled away.' },
      { step: '04', title: 'Final Grade', desc: 'Hole backfilled with chips or soil. Surface graded clean and level.' },
    ],
    safetyPromise: 'Ground well below grade with no regrowth guaranteed. Chips can stay as mulch or be removed — your call.',
    relatedSlugs: ['tree-removal', 'landscaping', 'land-clearing'],
  },
  'tree-pruning': {
    slug: 'tree-pruning',
    title: 'Tree Pruning',
    subtitle: 'Clean structural pruning to improve safety, health, clearance, and appearance.',
    heroDesc: 'Expert crown shaping and limb removal for healthier, safer trees.',
    overview: "Proper pruning isn't just about looks — it's about tree health, storm safety, and property protection. Heavy Tree Service provides structural pruning that removes deadwood, reduces wind load, improves clearance, and promotes healthy growth patterns. Every cut is made at the correct collar for clean healing.",
    whenToCall: [
      'Overgrown branches touching rooflines or siding',
      'Branches hanging over driveways, walkways, or roads',
      'Dead or dying limbs that could fall in storms',
      'Trees needing crown thinning to reduce wind resistance',
      'Fruit trees or ornamentals needing seasonal shaping',
    ],
    howItWorks: [
      { step: '01', title: 'Tree Inspection', desc: "We assess the tree's structure, health, and clearance requirements." },
      { step: '02', title: 'Pruning Plan', desc: 'Target limbs are identified — deadwood, crossing branches, clearance issues, structural defects.' },
      { step: '03', title: 'Precision Cutting', desc: 'Clean cuts at the branch collar using proper technique. No stub cuts, no bark stripping.' },
      { step: '04', title: 'Cleanup & Haul', desc: 'All branches and debris removed from the site. Your property left looking clean and cared for.' },
    ],
    safetyPromise: 'ISA-standard pruning practices. Every cut made correctly for the long-term health and structure of the tree.',
    relatedSlugs: ['tree-removal', 'storm-cleanup', 'landscaping'],
  },
  'land-clearing': {
    slug: 'land-clearing',
    title: 'Land Clearing',
    subtitle: 'Clear lots, brush, overgrowth, and unwanted trees for usable space.',
    heroDesc: 'Full-site clearing for construction, development, or reclamation — brush to timber.',
    overview: "Whether you're preparing a building lot, reclaiming overgrown acreage, or clearing a fence line, Heavy Tree Service brings the equipment and crew to handle it. We clear brush, trees, stumps, and debris from lots of any size — leaving you with clean, usable land.",
    whenToCall: [
      'Building lot prep for new construction',
      'Overgrown acreage being reclaimed for pasture or use',
      'Fence line and boundary clearing',
      'Property being subdivided or developed',
      'Heavy brush and invasive species removal',
    ],
    howItWorks: [
      { step: '01', title: 'Site Survey', desc: 'We walk the property, mark boundaries, and identify what stays and what goes.' },
      { step: '02', title: 'Heavy Clearing', desc: 'Commercial equipment removes trees, brush, and stumps. We work methodically across the site.' },
      { step: '03', title: 'Debris Processing', desc: 'Material chipped, hauled, or stacked per your preference. Nothing left to rot on site.' },
      { step: '04', title: 'Final Pass', desc: 'Site graded and cleaned. Ready for construction, seeding, or next-phase work.' },
    ],
    safetyPromise: 'Commercial machinery capable of handling the heaviest clearing work. Acreage jobs welcome. Full insurance coverage.',
    relatedSlugs: ['tree-removal', 'stump-grinding', 'landscaping'],
  },
  'landscaping': {
    slug: 'landscaping',
    title: 'Landscaping',
    subtitle: 'Finish the property with clean, practical landscaping after heavy tree work.',
    heroDesc: 'Grading, cleanup, and finishing to leave your property looking its best.',
    overview: "Tree work often leaves a yard looking raw. Whether it's grading after removal, spreading topsoil, brush hauling, or seasonal cleanup, Heavy Tree Service helps finish the job so your property looks complete. We don't just remove — we restore.",
    whenToCall: [
      'Post-removal site grading and leveling',
      'Brush and debris removal from overgrown lots',
      'Seasonal yard cleanup — storm debris, fallen branches',
      'Property boundary cleanup and edge maintenance',
      'Final finishing after land clearing or construction',
    ],
    howItWorks: [
      { step: '01', title: 'Site Evaluation', desc: 'We assess what needs to be done — grading, cleanup, hauling, or finishing work.' },
      { step: '02', title: 'Heavy Cleanup', desc: 'Brush, logs, stumps, and debris removed. We haul everything off-site.' },
      { step: '03', title: 'Grading & Leveling', desc: 'Soil graded and leveled. Low spots filled. Surface prepped for seed or sod.' },
      { step: '04', title: 'Final Detail', desc: 'Property edge cleaned, debris gone, yard ready for use.' },
    ],
    safetyPromise: 'We haul everything out — chips, logs, brush, debris. Site left cleaned up and ready for whatever comes next.',
    relatedSlugs: ['land-clearing', 'stump-grinding', 'tree-pruning'],
  },
};

export function getServiceContent(slug: string): ServiceContent | undefined {
  return SERVICE_CONTENT[slug];
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(SERVICE_CONTENT);
}

export const SERVICE_AREA_DATA = [
  { slug: 'finleyville', name: 'Finleyville, PA', region: 'Washington County' },
  { slug: 'pittsburgh', name: 'Pittsburgh, PA', region: 'Allegheny County' },
  { slug: 'south-hills', name: 'South Hills, PA', region: 'Allegheny County' },
  { slug: 'washington-county', name: 'Washington County, PA', region: 'Washington County' },
  { slug: 'allegheny-county', name: 'Allegheny County, PA', region: 'Allegheny County' },
];
