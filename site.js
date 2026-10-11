// Project card titles and descriptive subtitles.
const designProjects = [
  {
    "title": "In Plain Sight - Hobard Women's Shelter",
    "category": "Modular Housing Design",
    "slug": "design-1",
    "image": "in-plain-sight/model.webp",
    "group": "embody"
  },
  {
    "title": "From Presence to Access",
    "category": "Housing + Institution Development Project in Woodlawn",
    "slug": "design-2",
    "image": "woodlawn/cover.webp",
    "group": "embody"
  },
  {
    "title": "The Eastie Necklace",
    "category": "Urban Design for Housing in East Boston",
    "slug": "design-3",
    "image": "eastie-necklace/cover.webp",
    "group": "embody"
  },
  {
    "title": "BerryScape",
    "category": "Productive Landscape Urban Design",
    "slug": "design-4",
    "image": "berryscape/cover.webp",
    "group": "embody"
  },
  {
    "title": "The HUB",
    "category": "Transportation-Oriented Urban Design",
    "slug": "design-5",
    "image": "the-hub/cover.webp",
    "group": "embody"
  },
  {
    "title": "Paving with Books",
    "category": "Library and Public Space Design",
    "slug": "design-6",
    "image": "paving-with-books/cover.webp",
    "group": "embody"
  },
  {
    "title": "La Higuera Blanca",
    "category": "Congress Centre Design",
    "slug": "design-7",
    "image": "la-higuera-blanca/cover.webp",
    "group": "embody"
  }
];
const researchProjects = [
  { title: 'Renovate it yourself!', slug: 'renovate-it-yourself', image: 'renovate/participation.webp', category: 'Generative-AI-based Housing Renovation Experiment' },
  { title: 'Fast Tracking Affordable Housing Development in NYC', ongoing: true, hidden: true, slug: 'fast-track-nyc-housing', image: 'research-4' },
  { title: 'Blue Tents', slug: 'blue-tents', image: 'blue-tents/cover.webp', category: 'Research on Temporary Housing in Tibet' },
  { title: 'Urban Perception: Tourist vs Resident', slug: 'tourists-vs-residents', image: 'tourist-resident/semantic-analysis.webp', category: 'Multimodal Social Sensing' },
].map(project => ({ category: 'Housing + Urban Research', ...project, group: 'empower' }));
function renderProjects(containerId, projects) {
  const container = document.getElementById(containerId);
  for (const project of projects) {
    const link = document.createElement('a');
    link.className = 'project-card';
    link.dataset.group = project.group;
    link.href = `projects/${project.slug}.html`;
    const imageWrap = document.createElement('div');
    imageWrap.className = 'image-wrap';
    const image = document.createElement('img');
    image.src = `assets/${project.image && /\.(webp|png|jpe?g)$/i.test(project.image) ? project.image : (project.image || project.slug) + ".jpg"}`;
    image.src += "?v=color-2";
    image.alt = ''; // Decorative placeholder; the adjacent heading names the link.
    image.loading = 'lazy';
    image.width = 800;
    image.height = 600;
    imageWrap.append(image);
    const caption = document.createElement('div');
    caption.className = 'card-caption';
    const text = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = project.title;
    const category = document.createElement('p');
    category.textContent = project.category;
    text.append(heading, category);
    if (project.ongoing) {
      const note = document.createElement('small');
      note.className = 'card-status';
      note.textContent = 'ongoing';
      text.append(note);
    }
    const arrow = document.createElement('span');
    arrow.className = 'card-arrow';
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden', 'true');
    caption.append(text, arrow);
    link.append(imageWrap, caption);
    container.append(link);
  }
}

const engagementProjects = [
  { title: 'Unhoused America', ongoing: true, slug: 'unhoused-america', image: 'unhoused-america/map-detail-original.png', category: 'Homelessness Research & Digital Storytelling' },
  { title: 'What is AMI and Why is it Important?', slug: 'ami-brochure', image: 'ami/brochure-3.webp', category: 'Community Education for Affordable Housing' },
  { title: "Chongqing Children's Hospital", slug: 'chongqing-childrens-hospital', image: 'chongqing/painted-wall.webp', category: 'Community Outdoor Space + Mural Design' },
].map(project => ({ category: 'Community Engagement', ...project, group: 'engage' }));
const projectOrder = [
  'design-1', 'design-2', 'fast-track-nyc-housing', 'ami-brochure',
  'unhoused-america', 'design-3', 'renovate-it-yourself', 'blue-tents',
  'design-4', 'design-5', 'tourists-vs-residents', 'design-6',
  'chongqing-childrens-hospital', 'design-7',
];
const orderedProjects = [...designProjects, ...researchProjects, ...engagementProjects];
function projectRank(project) {
  // Reserve third place for Fast Tracking when the project is complete.
  if (project.slug === 'fast-track-nyc-housing' && project.ongoing) return projectOrder.length;
  const rank = projectOrder.indexOf(project.slug);
  return rank < 0 ? projectOrder.length : rank;
}
orderedProjects.sort((a, b) => projectRank(a) - projectRank(b));
renderProjects('all-projects', orderedProjects.filter(project => !project.hidden));
const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
const showAll = document.getElementById('show-all');
const status = document.getElementById('project-status');
let selected = 'all';
function filterProjects(group) {
  selected = group;
  let count = 0;
  for (const card of cards) {
    card.hidden = group !== 'all' && !card.dataset.group.split(' ').includes(group);
    if (!card.hidden) count++;
  }
  for (const button of filters) button.setAttribute('aria-pressed', String(button.dataset.filter === group));
  showAll.setAttribute('aria-pressed', String(group === 'all'));
  status.textContent = `${count} projects${group === 'all' ? '' : ' · ' + group.toUpperCase()}`;
}
for (const button of filters) {
  button.addEventListener('click', () => filterProjects(selected === button.dataset.filter ? 'all' : button.dataset.filter));
}
showAll.addEventListener('click', () => filterProjects('all'));
filterProjects('all');
