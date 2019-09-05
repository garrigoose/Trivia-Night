/*
 * Work through each of the prompts below. Update `index.html` with the link to
 * this file to see your results in the console.
 *
 * Pro Tip: Comment out your solution to a prompt before moving on to the next
 * one.
 */

/*
 * Prompt 01:
 *
 * Solar System! Work through the subprompts below using the solarSystem array.
 */

const solarSystem = [
  { name: "Mercury", ringSystem: false, moons: [] },
  { name: "Venus", ringSystem: false, moons: [] },
  { name: "Earth", ringSystem: false, moons: ["The Moon"] },
  { name: "Mars", ringSystem: false, moons: ["Phobos", "Deimos"] },
  {
    name: "Jupiter",
    ringSystem: true,
    moons: ["Europa", "Ganymede", "Io", "Callisto"]
  },
  {
    name: "Saturn",
    ringSystem: true,
    moons: ["Titan", "Enceladus", "Rhea", "Mimas"]
  },
  {
    name: "Uranus",
    ringSystem: true,
    moons: ["Miranda", "Titania", "Ariel", "Umbriel"]
  },
  { name: "Neptune", ringSystem: true, moons: ["Triton", "Nereid"] }
];

/*
 * For each planet, print the name "[planet name] is beautiful" where planet
 * name is replaced with the name of the planet.
 */

/*
 * Create an array of all the planet names.
 */

/*
 * Create an array of planets that do have a ringSystem
 */

/*
 * Create an array of planes with 3 or more moons.
 */

/*
 * Sort the planets in the array by the number of moons they have
 */

/*
 * Prompt 02:
 *
 * Bond, James Bond! Complete the subprompts below using the bondFilms array.
 */

const bondFilms = [
  {
    title: "Skyfall",
    year: 2012,
    actor: "Daniel Craig",
    gross: "$1,108,561,008"
  },
  {
    title: "Thunderball",
    year: 1965,
    actor: "Sean Connery",
    gross: "$1,014,941,117"
  },
  {
    title: "Goldfinger",
    year: 1964,
    actor: "Sean Connery",
    gross: "$912,257,512"
  },
  {
    title: "Live and Let Die",
    year: 1973,
    actor: "Roger Moore",
    gross: "$825,110,761"
  },
  {
    title: "You Only Live Twice",
    year: 1967,
    actor: "Sean Connery",
    gross: "$756,544,419"
  },
  {
    title: "The Spy Who Loved Me",
    year: 1977,
    actor: "Roger Moore",
    gross: "$692,713,752"
  },
  {
    title: "Casino Royale",
    year: 2006,
    actor: "Daniel Craig",
    gross: "$669,789,482"
  },
  {
    title: "Moonraker",
    year: 1979,
    actor: "Roger Moore",
    gross: "$655,872,400"
  },
  {
    title: "Diamonds Are Forever",
    year: 1971,
    actor: "Sean Connery",
    gross: "$648,514,469"
  },
  {
    title: "Quantum of Solace",
    year: 2008,
    actor: "Daniel Craig",
    gross: "$622,246,378"
  },
  {
    title: "From Russia with Love",
    year: 1963,
    actor: "Sean Connery",
    gross: "$576,277,964"
  },
  {
    title: "Die Another Day",
    year: 2002,
    actor: "Pierce Brosnan",
    gross: "$543,639,638"
  },
  {
    title: "Goldeneye",
    year: 1995,
    actor: "Pierce Brosnan",
    gross: "$529,548,711"
  },
  {
    title: "On Her Majesty's Secret Service",
    year: 1969,
    actor: "George Lazenby",
    gross: "$505,899,782"
  },
  {
    title: "The World is Not Enough",
    year: 1999,
    actor: "Pierce Brosnan",
    gross: "$491,617,153"
  },
  {
    title: "For Your Eyes Only",
    year: 1981,
    actor: "Roger Moore",
    gross: "$486,468,881"
  },
  {
    title: "Tomorrow Never Dies",
    year: 1997,
    actor: "Pierce Brosnan",
    gross: "$478,946,402"
  },
  {
    title: "The Man with the Golden Gun",
    year: 1974,
    actor: "Roger Moore",
    gross: "$448,249,281"
  },
  { title: "Dr. No", year: 1962, actor: "Sean Connery", gross: "$440,759,072" },
  {
    title: "Octopussy",
    year: 1983,
    actor: "Roger Moore",
    gross: "$426,244,352"
  },
  {
    title: "The Living Daylights",
    year: 1987,
    actor: "Timothy Dalton",
    gross: "$381,088,866"
  },
  {
    title: "A View to a Kill",
    year: 1985,
    actor: "Roger Moore",
    gross: "$321,172,633"
  },
  {
    title: "License to Kill",
    year: 1989,
    actor: "Timothy Dalton",
    gross: "$285,157,191"
  }
];

/*
 * Create a new array with only the titles of the Bond films:
 */

/*
 * Create a new array with only the gross revenue for each Bond film:
 */

/*
 * Create a new array with only the years of each Bond film:
 */

/*
 * Sort the bondFilms array by year:
 */

/*
 * Create a new array oddBonds, of only the Bond films released on odd-numbered years:
 */

/*
 * Determine the total cumulative gross of the Bond franchise (reduce), and console.log
 * the result. hint To make the grosses into usable numbers, look into the
 * .replace Javascript method (there are many ways to do this, however). Look
 * into parseInt also:
 */

/*
 * Create an object with each bond actor and the number of movies they played
 * in:
 *
 * i.e:
 *
 * {
 *  'Pierce Brosnan': 3,
 *  'Sean Connery': 6,
 * }
 */
