import {
  ChevronDown,
  Clock,
  Eye,
  Flame,
  Ghost,
  MapPin,
  Menu,
  Skull,
  Star,
  Ticket,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Data ────────────────────────────────────────────────────────────────────

type HauntedHouse = {
  id: string;
  name: string;
  image: string;
  tagline: string;
  description: string;
  openIn2026?: boolean;
};

const HAUNTED_HOUSES: HauntedHouse[] = [
  {
    id: "schoolhouse-break",
    name: "Schoolhouse Break",
    image: "/assets/generated/house-schoolhouse-break.dim_800x500.jpg",
    tagline: "Class is in permanent session — and you're failing.",
    description:
      "The halls of learning have gone silent… or have they? Step inside a school where the lessons never end and the teachers have lost their minds. Every classroom holds a new nightmare, every hallway echoes with screams that were never meant to be heard. The chalkboards still write — but not with chalk.",
    openIn2026: true,
  },
  {
    id: "terror-hellhole",
    name: "Terror Hell Hole",
    image: "/assets/generated/house-terror-hellhole.dim_800x500.jpg",
    tagline: "Abandon hope. You are already burning.",
    description:
      "Descend into the depths of pure damnation. The heat is real, the demons are restless, and escape is not guaranteed. This is not a house — it is a sentence. Enter if you dare to face what waits in the burning dark below. The gates of hell do not open for cowards.",
    openIn2026: true,
  },
  {
    id: "obsession",
    name: "Obsession",
    image: "/assets/generated/house-obsession.dim_800x500.jpg",
    tagline: "Someone has been waiting. Someone has been watching.",
    description:
      "Someone has been watching you. Collecting pieces of you. Building something in the dark. Their obsession has no cure, and now that you've entered their world, you belong to them. Every room reveals a deeper madness you cannot unsee. The door behind you is already locked.",
    openIn2026: true,
  },
  {
    id: "blackout",
    name: "Blackout",
    image: "/assets/generated/house-blackout.dim_800x500.jpg",
    tagline: "In the dark, you are never alone.",
    description:
      "No lights. No guides. No mercy. In the Blackout, your senses are stripped away one by one. Something lurks in the absolute darkness with you — breathing, waiting, reaching. You will not see it coming until it is already too late. We advise guests who fear the dark to reconsider.",
  },
  {
    id: "asylum-hell",
    name: "Asylum Hell",
    image: "/assets/generated/house-asylum-hell.dim_800x500.jpg",
    tagline: "The patients run the ward now.",
    description:
      "The patients took over decades ago and the doctors were never found. What remains inside these crumbling walls is something between madness and evil. Every cell holds a story, every corridor a trap, and every exit is a lie. The screams you hear ahead are not performances.",
    openIn2026: true,
  },
];

type ScareZone = {
  id: string;
  name: string;
  image: string;
  tagline: string;
  description: string;
  openIn2026?: boolean;
};

const SCARE_ZONES: ScareZone[] = [
  {
    id: "carnevil-bros",
    name: "Carnevil Bros Circus",
    image: "/assets/generated/zone-carnevil-bros.dim_800x500.jpg",
    tagline: "Step right up. You cannot step away.",
    description:
      "Step right up to the most terrifying show on earth. The Carnevil Bros have set up their twisted big top and the performers are not here to entertain — they are here to hunt. Cotton candy drips red, the carousel spins without stopping, and the clowns never smile without a reason.",
    openIn2026: true,
  },
  {
    id: "screamtown-chaos",
    name: "Screamtown Chaos",
    image: "/assets/generated/zone-screamtown-chaos.dim_800x500.jpg",
    tagline: "Population: Unknown. Survivors: Fewer.",
    description:
      "This town was condemned years ago but something refused to leave. The streets run red, the buildings shift and groan, and every shadow hides something that should not exist. Screamtown has no sheriff, no rules, and no survivors on record. You are not a visitor — you are a target.",
  },
  {
    id: "steampunk-break",
    name: "Steampunk Break",
    image: "/assets/generated/zone-steampunk-break.dim_800x500.jpg",
    tagline: "The age of machines. Your age is over.",
    description:
      "The machines have awakened and they hunger for something organic. Steam hisses from fractured pipes, gears grind against bone, and the creatures born of metal and malice patrol these industrial corridors. Welcome to the age of the machine — your age has just ended.",
    openIn2026: true,
  },
  {
    id: "zombieville",
    name: "Zombieville",
    image: "/assets/generated/zone-zombieville.dim_800x500.jpg",
    tagline: "They remember enough to recognize prey.",
    description:
      "The dead do not rest here. They roam. They hunger. They remember enough to recognize prey. Zombieville was once a quiet neighborhood — now it is a feeding ground. Keep moving, stay quiet, and whatever you do, do not let them surround you.",
    openIn2026: true,
  },
  {
    id: "ghost-town",
    name: "Ghost Town",
    image: "/assets/generated/zone-ghost-town-screamfest.dim_800x500.jpg",
    tagline: "They never left. They're still waiting for you.",
    description:
      "The town was abandoned in 1887 after an unspeakable tragedy that no one survived to explain. The streets are still haunted by the restless souls of those who perished — cowboy specters, ghostly barkeeps, and something far older that has no name. Every building is a tomb. Every shadow hides a spirit. And every visitor becomes the next resident.",
    openIn2026: true,
  },
];

const SHOWS = [
  {
    id: "bee-dance",
    name: "Bee Dance Show",
    image: "/assets/generated/show-bee-dance.dim_800x500.jpg",
    tagline: "The swarm performs. The swarm decides when to stop.",
    description:
      "A hypnotic nightmare of movement and darkness. The Bee Dancers move in perfect, terrifying unison — their costumes glistening, their eyes never blinking. This performance will burrow under your skin long after the final bow. You will clap, whether you want to or not.",
    showtimes: ["7:30 PM", "9:00 PM", "10:30 PM"],
  },
  {
    id: "monster-bash",
    name: "Monster Bash",
    image: "/assets/generated/show-monster-bash.dim_800x500.jpg",
    tagline: "Every monster you feared. All in one place. All in one night.",
    description:
      "Every monster you ever feared has gathered for one night of pure, unholy celebration. The Monster Bash is part concert, part horror show, part fever dream. You will clap, you will scream, and you will question everything you thought was imaginary.",
    showtimes: ["8:00 PM", "9:30 PM", "11:00 PM"],
  },
  {
    id: "deadmans-revenge",
    name: "Deadman's Revenge",
    image: "/assets/generated/show-deadmans-revenge.dim_800x500.jpg",
    tagline: "He died angry. He came back worse.",
    description:
      "He died with unfinished business and now he has returned to settle the score. Deadman's Revenge is a live theatrical horror experience featuring stunt performers, pyrotechnics, and a storyline so intense the line between performance and reality begins to blur.",
    showtimes: ["8:30 PM", "10:00 PM", "11:30 PM"],
  },
];

const ICONS = [
  {
    id: "fiona",
    name: "Fiona the Clown",
    image: "/assets/generated/icon-fiona-clown.dim_600x700.jpg",
    role: "Queen of Chaos",
    description:
      "Fiona rules the carnival with painted fury and a laugh that makes children freeze. She has been performing since before you were born and she has no intention of stopping. Part clown, part carnival royalty — her smile hides every secret this park has ever kept. Cross her and the whole park knows by morning.",
  },
  {
    id: "grimm",
    name: "Grimm the Reaper",
    image: "/assets/generated/icon-grimm-reaper.dim_600x700.jpg",
    role: "The Final Warning",
    description:
      "He walks the grounds after midnight, and where he walks, things go quiet. Grimm is not a performer — he is a warning. Those who cross his path report a cold that never fully leaves them. His scythe is decorative. His presence is not.",
  },
  {
    id: "baron",
    name: "Baron the Butcher",
    image: "/assets/generated/icon-baron-butcher.dim_600x700.jpg",
    role: "The Hungry One",
    description:
      "Nobody knows where Baron came from but the rumors are consistent: he was once a chef, something went terribly wrong, and now he wanders looking for new ingredients. His cleaver has never been clean. His menu changes nightly.",
  },
  {
    id: "vex",
    name: "Vex the Jester",
    image: "/assets/generated/icon-vex-jester.dim_600x700.jpg",
    role: "Master of Tricks",
    description:
      "Chaos is his craft, confusion is his weapon. Vex appears when you least expect it and vanishes before you can process what just happened. His tricks always have consequences and his punchlines are never funny to the victim.",
  },
  {
    id: "mama-bones",
    name: "Mama Bones",
    image: "/assets/generated/icon-mama-bones.dim_600x700.jpg",
    role: "Keeper of Secrets",
    description:
      "She has lived longer than any building on these grounds and she remembers everything. Mama Bones is the keeper of secrets, the grandmother of nightmares, and the last face many guests report seeing before they stopped talking about their visit entirely.",
  },
];

const FOOD_BOOTHS = [
  {
    id: "sharks-hell",
    name: "Sharks Hell",
    image: "/assets/generated/booth-sharks-hell.dim_800x500.jpg",
    tagline: "Ice cream so good it's sinister.",
    description:
      "Dive into the deep end of dessert depravity. Sharks Hell serves only the most diabolically delicious frozen creations, crafted from recipes that were never meant to leave the ocean floor. Every scoop comes with a warning and every bite ignores it.",
    menu: [
      { name: "Blood Moon Sundae", price: "$8" },
      { name: "Screaming Soft Serve Cone", price: "$5" },
      { name: "Graveyard Parfait", price: "$9" },
      { name: "Haunted Hot Fudge Brownie Bowl", price: "$10" },
      { name: "Demon Dip Ice Cream Sandwich", price: "$7" },
      { name: "Frozen Scream Float", price: "$8" },
      { name: "Coffin Crunch Banana Split", price: "$11" },
      { name: "Shark Bite Sorbet Cup", price: "$6" },
    ],
  },
  {
    id: "slider-cook",
    name: "Slider Cook Booth",
    image: "/assets/generated/booth-slider-cook.dim_800x500.jpg",
    tagline: "Where the dead eat well.",
    description:
      "Fuel your scream with the most outrageously loaded comfort food this side of the underworld. Slider Cook serves the kind of burgers and fries that haunt your dreams — in the good way. Nobody leaves this booth unhappy. Nobody leaves this booth without a mess.",
    menu: [
      { name: "Loaded Doom Fries", price: "$8" },
      { name: "The Annihilator Burger", price: "$12" },
      { name: "Bloody BBQ Slider Stack (3pc)", price: "$10" },
      { name: "Cheese Lava Fries", price: "$9" },
      { name: "Double Death Smash Burger", price: "$14" },
      { name: "Demon Wings (6pc)", price: "$11" },
      { name: "Crispy Chaos Chicken Sandwich", price: "$11" },
      { name: "Graveyard Onion Rings", price: "$7" },
    ],
  },
];

const EVENTS = [
  {
    id: "chaos-purge",
    name: "Chaos Purge",
    image: "/assets/generated/event-chaos-purge-screamfest.dim_800x500.jpg",
    date: "July 2026 | 6 PM – 1 AM",
    tagline: "For one night, the rules don't exist.",
    description:
      "Every year in July, TCEA opens its gates for the most extreme night of the season. The Chaos Purge is an all-out haunted experience where the scare actors have no limits, every zone is active simultaneously, and the park transforms into something even we can barely control. 6 PM to 1 AM. Bring your bravest friends.",
  },
  {
    id: "christmas-wonderland",
    name: "Christmas Wonderland",
    image: "/assets/generated/event-christmas-wonderland.dim_800x500.jpg",
    date: "December 2026",
    tagline: "Tis the season to be terrified.",
    description:
      "December at TCEA is not the holiday season you remember. Christmas Wonderland transforms the scream park into a frozen nightmare of undead elves, evil Santas, and holiday horrors that will make you reconsider every childhood memory of December. Come for the holiday lights. Stay because you can't leave.",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function BloodDripHeader() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 24 }}>
      <svg
        viewBox="0 0 1440 24"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <path
          fill="oklch(0.45 0.24 22)"
          d="M0,0 L60,0 Q65,14 70,14 Q75,14 80,0 L140,0 Q148,18 155,18 Q162,18 168,0 L230,0 Q235,20 242,20 Q249,20 254,0 L320,0 Q325,16 330,16 Q335,16 340,0 L400,0 Q408,22 416,22 Q424,22 430,0 L490,0 Q497,15 504,15 Q511,15 516,0 L580,0 Q585,19 592,19 Q599,19 604,0 L660,0 Q668,17 675,17 Q682,17 688,0 L750,0 Q758,21 765,21 Q772,21 778,0 L840,0 Q845,13 850,13 Q855,13 860,0 L920,0 Q928,20 936,20 Q944,20 950,0 L1010,0 Q1016,18 1022,18 Q1028,18 1034,0 L1100,0 Q1107,23 1115,23 Q1123,23 1128,0 L1190,0 Q1197,16 1204,16 Q1211,16 1216,0 L1280,0 Q1287,19 1295,19 Q1303,19 1308,0 L1370,0 Q1377,14 1384,14 Q1391,14 1396,0 L1440,0 L1440,24 L0,24 Z"
        />
      </svg>
    </div>
  );
}

function NavBar({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Houses", href: "#haunted-houses" },
    { label: "Zones", href: "#scare-zones" },
    { label: "Shows", href: "#shows" },
    { label: "Events", href: "#events" },
    { label: "Characters", href: "#characters" },
    { label: "Food", href: "#food-booths" },
    { label: "Attractions", href: "#attractions" },
    { label: "Procession", href: "#procession" },
    { label: "Auditions", href: "#auditions" },
    { label: "Tickets", href: "#tickets" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 blood-header-drip"
      style={{
        background: "oklch(0.07 0.015 0 / 0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.22 0.04 25 / 0.6)",
      }}
      data-ocid="nav.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            data-ocid="nav.link"
            className="flex items-center gap-2 shrink-0 bg-transparent border-0 p-0 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/assets/generated/tcea-logo-transparent.dim_400x200.png"
              alt="TCEA Scream Fest"
              className="h-10 w-auto"
              loading="eager"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                style={{
                  color:
                    activeSection === link.href.slice(1)
                      ? "oklch(0.72 0.18 60)"
                      : undefined,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#tickets"
              data-ocid="nav.tickets.primary_button"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-200"
              style={{
                background: "oklch(0.55 0.22 25)",
                color: "oklch(0.97 0.01 80)",
                border: "1px solid oklch(0.65 0.22 25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "oklch(0.65 0.22 25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "oklch(0.55 0.22 25)";
              }}
            >
              <Ticket size={12} />
              Get Tickets
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.toggle"
            style={{ color: "oklch(0.97 0.01 80)" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: "oklch(0.07 0.015 0)",
            borderColor: "oklch(0.22 0.04 25 / 0.6)",
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm"
                data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <BloodDripHeader />
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: 64 }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x600.jpg"
          alt="TCEA Scream Fest"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(1.2)" }}
        />
        {/* Atmospheric overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.08 0.01 0 / 0.3) 0%, oklch(0.08 0.01 0 / 0.15) 40%, oklch(0.08 0.01 0 / 0.7) 80%, oklch(0.08 0.01 0) 100%)",
          }}
        />
        {/* Strobe overlay (subtle) */}
        <div
          className="strobe-overlay absolute inset-0 pointer-events-none bg-white"
          aria-hidden="true"
        />
      </div>

      {/* Fog layer */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none animate-drift-fog"
        style={{
          height: 200,
          background:
            "linear-gradient(0deg, oklch(0.08 0.01 0 / 0.8) 0%, oklch(0.25 0.05 22 / 0.15) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Small eyebrow */}
        <div
          className="section-tag mb-6 animate-slide-up-fade"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          Waterford, VA • Haunted Attraction
        </div>

        {/* Logo */}
        <div
          className="mb-8 animate-slide-up-fade"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <img
            src="/assets/generated/tcea-logo-transparent.dim_400x200.png"
            alt="TCEA Scream Fest"
            className="h-28 md:h-40 w-auto mx-auto drop-shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <h1
          className="font-display font-black uppercase tracking-wide leading-none mb-6 animate-slide-up-fade glow-text-red"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            animationDelay: "0.35s",
            opacity: 0,
            color: "oklch(0.97 0.01 80)",
          }}
        >
          Where Nightmares
          <br />
          <span style={{ color: "oklch(0.62 0.22 25)" }}>Come to Life</span>
        </h1>

        <p
          className="font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-slide-up-fade"
          style={{
            color: "oklch(0.85 0.04 60)",
            animationDelay: "0.5s",
            opacity: 0,
          }}
        >
          The only extreme haunted carnival scream park in Waterford, VA. Five
          haunted houses. Four scare zones. Three live shows. Endless terror.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-fade"
          style={{ animationDelay: "0.65s", opacity: 0 }}
        >
          <a
            href="#haunted-houses"
            data-ocid="hero.primary_button"
            className="inline-flex items-center gap-2 px-8 py-4 font-display font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-300 animate-pulse-glow"
            style={{
              background: "oklch(0.55 0.22 25)",
              color: "oklch(0.97 0.01 80)",
              border: "1px solid oklch(0.65 0.22 25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "oklch(0.65 0.22 25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "oklch(0.55 0.22 25)";
            }}
          >
            <Skull size={16} />
            Explore the Terror
          </a>
          <a
            href="#tickets"
            data-ocid="hero.secondary_button"
            className="inline-flex items-center gap-2 px-8 py-4 font-display font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-300"
            style={{
              background: "transparent",
              color: "oklch(0.97 0.01 80)",
              border: "1px solid oklch(0.55 0.22 25 / 0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.55 0.22 25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.55 0.22 25 / 0.5)";
            }}
          >
            <Ticket size={16} />
            Get Tickets
          </a>
        </div>

        {/* Info pills */}
        <div
          className="flex flex-wrap justify-center gap-4 mt-12 animate-slide-up-fade"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          {[
            { icon: <MapPin size={14} />, text: "Waterford, VA" },
            { icon: <Clock size={14} />, text: "Fri–Sun, 5 PM til close" },
            { icon: <Skull size={14} />, text: "5 Haunted Houses" },
            { icon: <Ghost size={14} />, text: "4 Scare Zones" },
            { icon: <Star size={14} />, text: "Opens Aug 22, 2026" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium"
              style={{
                background: "oklch(0.11 0.01 0 / 0.7)",
                border: "1px solid oklch(0.22 0.04 25 / 0.5)",
                color: "oklch(0.85 0.04 60)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ color: "oklch(0.62 0.22 25)" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#haunted-houses"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
        data-ocid="hero.link"
        style={{ color: "oklch(0.97 0.01 80)" }}
      >
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{ fontFamily: "Outfit" }}
        >
          Scroll
        </span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}

function SectionHeading({
  tag,
  title,
  subtitle,
}: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <div className="section-tag">{tag}</div>
      <h2
        className="font-display font-black uppercase flicker-title"
        style={{
          fontSize: "clamp(2rem, 6vw, 4.5rem)",
          color: "oklch(0.97 0.01 80)",
          letterSpacing: "-0.01em",
          lineHeight: 1.05,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 max-w-xl mx-auto text-base md:text-lg"
          style={{ color: "oklch(0.72 0.06 60)" }}
        >
          {subtitle}
        </p>
      )}
      <div className="blood-divider mt-6 max-w-xs mx-auto" />
    </div>
  );
}

function Open2026Badge() {
  return (
    <span
      className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm inline-flex items-center gap-1"
      style={{
        background: "oklch(0.20 0.08 145)",
        color: "oklch(0.85 0.20 145)",
        border: "1px solid oklch(0.55 0.20 145 / 0.7)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
        style={{ background: "oklch(0.65 0.22 145)" }}
      />
      Open 2026
    </span>
  );
}

function HouseCard({ house, index }: { house: HauntedHouse; index: number }) {
  return (
    <article
      className="horror-card rounded-sm overflow-hidden"
      data-ocid={`houses.item.${index + 1}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        ...(house.openIn2026
          ? {
              boxShadow:
                "0 0 0 1px oklch(0.55 0.20 145 / 0.5), 0 0 18px oklch(0.55 0.20 145 / 0.18)",
            }
          : {}),
      }}
    >
      {/* Top stripe */}
      <div
        className="h-1 w-full"
        style={{
          background: house.openIn2026
            ? "linear-gradient(90deg, oklch(0.45 0.20 145), oklch(0.65 0.22 145) 50%, oklch(0.45 0.20 145))"
            : "linear-gradient(90deg, oklch(0.55 0.22 25), oklch(0.65 0.18 60) 50%, oklch(0.55 0.22 25))",
        }}
      />
      {/* Image */}
      <div className="card-img-wrapper" style={{ height: 220 }}>
        <img src={house.image} alt={house.name} loading="lazy" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, oklch(0.08 0.01 0 / 0.75) 100%)",
          }}
        />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm"
            style={{
              background: "oklch(0.55 0.22 25)",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Haunted House
          </span>
          {house.openIn2026 && <Open2026Badge />}
        </div>
      </div>
      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="font-display font-bold uppercase leading-tight"
            style={{ fontSize: "1.2rem", color: "oklch(0.97 0.01 80)" }}
          >
            {house.name}
          </h3>
          <Skull
            size={18}
            style={{
              color: "oklch(0.62 0.22 25)",
              flexShrink: 0,
              marginTop: 2,
            }}
          />
        </div>
        <p
          className="text-sm italic mb-3"
          style={{ color: "oklch(0.72 0.18 60)" }}
        >
          "{house.tagline}"
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.82 0.03 60)" }}
        >
          {house.description}
        </p>
      </div>
    </article>
  );
}

function HauntedHousesSection() {
  return (
    <section
      id="haunted-houses"
      className="relative py-20 md:py-28 horror-bg-overlay"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="5 Houses of Horrors"
          title="Haunted Houses"
          subtitle="Each one built to break you differently. Five chances to find out what truly terrifies you."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HAUNTED_HOUSES.map((house, i) => (
            <HouseCard key={house.id} house={house} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ZoneCard({ zone, index }: { zone: ScareZone; index: number }) {
  return (
    <article
      className="horror-card rounded-sm overflow-hidden"
      data-ocid={`zones.item.${index + 1}`}
      style={
        zone.openIn2026
          ? {
              boxShadow:
                "0 0 0 1px oklch(0.55 0.20 145 / 0.5), 0 0 18px oklch(0.55 0.20 145 / 0.18)",
            }
          : undefined
      }
    >
      <div className="card-img-wrapper" style={{ height: 240 }}>
        <img src={zone.image} alt={zone.name} loading="lazy" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 30%, oklch(0.08 0.01 0 / 0.85) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-end p-5">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm inline-block"
                style={{
                  background: "oklch(0.45 0.18 50)",
                  color: "oklch(0.97 0.01 80)",
                }}
              >
                Scare Zone
              </span>
              {zone.openIn2026 && <Open2026Badge />}
            </div>
            <h3
              className="font-display font-black uppercase leading-tight"
              style={{ fontSize: "1.3rem", color: "oklch(0.97 0.01 80)" }}
            >
              {zone.name}
            </h3>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p
          className="text-sm italic mb-2"
          style={{ color: "oklch(0.72 0.18 60)" }}
        >
          "{zone.tagline}"
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.82 0.03 60)" }}
        >
          {zone.description}
        </p>
      </div>
    </article>
  );
}

function ScareZonesSection() {
  return (
    <section id="scare-zones" className="relative py-20 md:py-28">
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.06 0.01 0)" }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Outdoor Terror"
          title="Scare Zones"
          subtitle="Escape isn't an option when the terror follows you through the streets."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCARE_ZONES.map((zone, i) => (
            <ZoneCard key={zone.id} zone={zone} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowCard({ show, index }: { show: (typeof SHOWS)[0]; index: number }) {
  return (
    <article
      className="horror-card rounded-sm overflow-hidden"
      data-ocid={`shows.item.${index + 1}`}
    >
      <div className="card-img-wrapper" style={{ height: 260 }}>
        <img src={show.image} alt={show.name} loading="lazy" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, oklch(0.08 0.01 0 / 0.9) 100%)",
          }}
        />
        <div className="absolute bottom-4 left-4 right-4">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-2 inline-flex items-center gap-1"
            style={{
              background: "oklch(0.30 0.10 55)",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            <Star size={10} />
            Live Show
          </span>
          <h3
            className="font-display font-black uppercase leading-tight"
            style={{ fontSize: "1.3rem", color: "oklch(0.97 0.01 80)" }}
          >
            {show.name}
          </h3>
        </div>
      </div>
      <div className="p-5">
        <p
          className="text-sm italic mb-3"
          style={{ color: "oklch(0.72 0.18 60)" }}
        >
          "{show.tagline}"
        </p>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "oklch(0.82 0.03 60)" }}
        >
          {show.description}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <Clock size={13} style={{ color: "oklch(0.62 0.22 25)" }} />
          <span
            className="text-xs font-bold uppercase tracking-wide"
            style={{ color: "oklch(0.72 0.06 60)" }}
          >
            Showtimes:
          </span>
          {show.showtimes.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-sm font-mono"
              style={{
                background: "oklch(0.18 0.02 0)",
                color: "oklch(0.72 0.18 60)",
                border: "1px solid oklch(0.22 0.04 25 / 0.6)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ShowsSection() {
  return (
    <section id="shows" className="relative py-20 md:py-28 horror-bg-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Live Entertainment"
          title="Shows"
          subtitle="Three live performances you will not find anywhere else. Or survive."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHOWS.map((show, i) => (
            <ShowCard key={show.id} show={show} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section id="events" className="relative py-20 md:py-28">
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.06 0.01 0)" }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Special Nights"
          title="Events"
          subtitle="Beyond the regular season — extraordinary nights that push every limit."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENTS.map((event, i) => (
            <article
              key={event.id}
              className="horror-card rounded-sm overflow-hidden"
              data-ocid={`events.item.${i + 1}`}
            >
              <div className="card-img-wrapper" style={{ height: 280 }}>
                <img src={event.image} alt={event.name} loading="lazy" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 35%, oklch(0.08 0.01 0 / 0.92) 100%)",
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm inline-flex items-center gap-1"
                    style={{
                      background: "oklch(0.45 0.18 50 / 0.9)",
                      color: "oklch(0.97 0.01 80)",
                    }}
                  >
                    <Star size={10} />
                    Special Event
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: "oklch(0.72 0.18 60)" }}
                  >
                    {event.date}
                  </div>
                  <h3
                    className="font-display font-black uppercase leading-tight"
                    style={{ fontSize: "1.6rem", color: "oklch(0.97 0.01 80)" }}
                  >
                    {event.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p
                  className="text-sm italic mb-3"
                  style={{ color: "oklch(0.72 0.18 60)" }}
                >
                  "{event.tagline}"
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.85 0.03 60)" }}
                >
                  {event.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessionSection() {
  return (
    <section
      id="procession"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "oklch(0.05 0.02 22)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(0.55 0.22 25 / 0.3) 0px, oklch(0.55 0.22 25 / 0.3) 1px, transparent 1px, transparent 40px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading tag="Every Fri · Sat · Sun" title="The Procession" />

        <div
          className="rounded-sm p-8 md:p-12 mx-auto max-w-2xl animate-pulse-glow"
          style={{
            background: "oklch(0.10 0.02 22 / 0.8)",
            border: "1px solid oklch(0.55 0.22 25 / 0.4)",
          }}
        >
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.55 0.22 25 / 0.2)",
                border: "2px solid oklch(0.55 0.22 25 / 0.5)",
              }}
            >
              <Ghost size={28} style={{ color: "oklch(0.72 0.18 60)" }} />
            </div>
          </div>

          <div
            className="font-display font-black text-4xl md:text-6xl uppercase mb-2 glow-text-red"
            style={{ color: "oklch(0.72 0.18 60)" }}
          >
            6:15 PM
          </div>
          <p
            className="text-sm uppercase tracking-widest mb-6"
            style={{ color: "oklch(0.65 0.06 60)" }}
          >
            Every Friday, Saturday & Sunday
          </p>

          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "oklch(0.85 0.04 60)" }}
          >
            The gates open, the streets fill, and the creatures of TCEA Scream
            Fest spill out onto the main plaza. Sliders, stilt walkers, zombies,
            clowns, and things without names parade before you.
          </p>
          <p
            className="mt-4 text-base leading-relaxed font-bold"
            style={{ color: "oklch(0.97 0.01 80)" }}
          >
            Only witnessed once. Never forgotten.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Sliders",
              "Stilt Walkers",
              "Zombies",
              "Clowns",
              "The Unknown",
            ].map((role) => (
              <span
                key={role}
                className="text-xs px-3 py-1 rounded-sm font-medium uppercase tracking-wide"
                style={{
                  background: "oklch(0.55 0.22 25 / 0.15)",
                  border: "1px solid oklch(0.55 0.22 25 / 0.35)",
                  color: "oklch(0.85 0.04 60)",
                }}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CharactersSection() {
  return (
    <section id="characters" className="relative py-20 md:py-28">
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.06 0.01 0)" }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="The Residents"
          title="Icon Characters"
          subtitle="They live here. They don't leave. And now, neither might you."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {ICONS.map((character, i) => (
            <article
              key={character.id}
              className="horror-card rounded-sm overflow-hidden text-center"
              data-ocid={`characters.item.${i + 1}`}
            >
              <div className="card-img-wrapper" style={{ height: 280 }}>
                <img
                  src={character.image}
                  alt={character.name}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, oklch(0.08 0.01 0 / 0.9) 100%)",
                  }}
                />
              </div>
              <div className="p-4">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.62 0.22 25)" }}
                >
                  {character.role}
                </div>
                <h3
                  className="font-display font-black uppercase leading-tight mb-3"
                  style={{ fontSize: "1rem", color: "oklch(0.97 0.01 80)" }}
                >
                  {character.name}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.75 0.03 60)" }}
                >
                  {character.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoodBoothsSection() {
  return (
    <section
      id="food-booths"
      className="relative py-20 md:py-28 horror-bg-overlay"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Feed the Beast"
          title="Food Booths"
          subtitle="Even nightmares need fuel. Our food booths serve the damned and the hungry alike."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FOOD_BOOTHS.map((booth, i) => (
            <article
              key={booth.id}
              className="horror-card rounded-sm overflow-hidden"
              data-ocid={`food.item.${i + 1}`}
            >
              <div className="card-img-wrapper" style={{ height: 260 }}>
                <img src={booth.image} alt={booth.name} loading="lazy" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, oklch(0.08 0.01 0 / 0.9) 100%)",
                  }}
                />
                <div className="absolute bottom-4 left-4">
                  <h3
                    className="font-display font-black uppercase"
                    style={{ fontSize: "1.5rem", color: "oklch(0.97 0.01 80)" }}
                  >
                    {booth.name}
                  </h3>
                  <p
                    className="text-sm italic"
                    style={{ color: "oklch(0.72 0.18 60)" }}
                  >
                    {booth.tagline}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p
                  className="text-sm mb-5 leading-relaxed"
                  style={{ color: "oklch(0.82 0.03 60)" }}
                >
                  {booth.description}
                </p>
                <div
                  className="mb-2 text-xs font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.62 0.22 25)" }}
                >
                  — Menu —
                </div>
                <div>
                  {booth.menu.map((item) => (
                    <div key={item.name} className="menu-item">
                      <span
                        className="text-sm"
                        style={{ color: "oklch(0.88 0.03 60)" }}
                      >
                        {item.name}
                      </span>
                      <span
                        className="text-sm font-bold font-mono ml-4"
                        style={{ color: "oklch(0.72 0.18 60)" }}
                      >
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AttractionsSection() {
  return (
    <section id="attractions" className="relative py-20 md:py-28">
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.06 0.01 0)" }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="More to Discover"
          title="Special Attractions"
          subtitle="Beyond the houses and zones, more terror and fun awaits."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Scream Corn Maze */}
          <article
            className="horror-card rounded-sm overflow-hidden"
            data-ocid="attractions.cornmaze.card"
          >
            <div className="card-img-wrapper" style={{ height: 280 }}>
              <img
                src="/assets/generated/attraction-scream-cornmaze.dim_800x500.jpg"
                alt="Scream Cornmaze"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, oklch(0.08 0.01 0 / 0.9) 100%)",
                }}
              />
              <div className="absolute top-3 left-3">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm"
                  style={{
                    background: "oklch(0.25 0.06 145)",
                    color: "oklch(0.85 0.15 145)",
                  }}
                >
                  <Zap size={10} className="inline mr-1" />
                  Outdoor Attraction
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3
                className="font-display font-black uppercase mb-2"
                style={{ fontSize: "1.6rem", color: "oklch(0.97 0.01 80)" }}
              >
                Scream Cornmaze
              </h3>
              <p
                className="text-sm italic mb-3"
                style={{ color: "oklch(0.72 0.18 60)" }}
              >
                "Enter the stalks if you dare."
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.82 0.03 60)" }}
              >
                The Scream Cornmaze stretches across acres of dead, twisted corn
                that seems to shift when you are not looking. The paths change.
                The scarecrows move. And somewhere deep inside the maze,
                something is following you — patient, quiet, and very hungry.
                Most guests find their way out.{" "}
                <strong style={{ color: "oklch(0.62 0.22 25)" }}>Most.</strong>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Outdoor",
                  "Scarecrows Included",
                  "Paths Change Nightly",
                  "Not for the Faint",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-sm"
                    style={{
                      background: "oklch(0.14 0.02 145 / 0.5)",
                      color: "oklch(0.75 0.12 145)",
                      border: "1px solid oklch(0.30 0.08 145 / 0.4)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Kids Hayride */}
          <article
            className="horror-card rounded-sm overflow-hidden"
            data-ocid="attractions.hayride.card"
          >
            <div className="card-img-wrapper" style={{ height: 280 }}>
              <img
                src="/assets/generated/attraction-hayride.dim_800x500.jpg"
                alt="Kids Haunted Hayride"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, oklch(0.08 0.01 0 / 0.9) 100%)",
                }}
              />
              <div className="absolute top-3 left-3">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm"
                  style={{
                    background: "oklch(0.35 0.12 60)",
                    color: "oklch(0.97 0.01 80)",
                  }}
                >
                  <Star size={10} className="inline mr-1" />
                  Family Friendly
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3
                className="font-display font-black uppercase mb-2"
                style={{ fontSize: "1.6rem", color: "oklch(0.97 0.01 80)" }}
              >
                Kids Haunted Hayride
              </h3>
              <p
                className="text-sm italic mb-3"
                style={{ color: "oklch(0.72 0.18 60)" }}
              >
                "Spooky fun for the little screamers."
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.82 0.03 60)" }}
              >
                The only ride at TCEA that doesn't want to kill you — probably.
                Board the haunted hay wagon for a spooky-but-fun ride through
                the foggy woods surrounding the scream park. Jack-o-lanterns
                line the trail, costumed characters wave from the shadows, and
                the autumn air carries the sweet smell of the season. Perfect
                for the little screamers in the family.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "All Ages",
                  "Friendly Characters",
                  "Foggy Trail",
                  "Jack-O-Lanterns",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-sm"
                    style={{
                      background: "oklch(0.22 0.06 50 / 0.5)",
                      color: "oklch(0.82 0.14 60)",
                      border: "1px solid oklch(0.40 0.12 60 / 0.4)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function TicketsSection() {
  const passes = [
    {
      name: "Regular Pass",
      price: "$20",
      color: "oklch(0.55 0.22 25)",
      icon: <Ticket size={20} />,
      description:
        "Standard access to all 4 open haunted houses, 4 scare zones, and live shows. The classic way to face your fears.",
      features: [
        "4 Open Haunted Houses",
        "4 Scare Zones",
        "All Live Shows",
        "Procession Access",
      ],
    },
    {
      name: "VIP Pass",
      price: "$45",
      color: "oklch(0.65 0.18 60)",
      icon: <Star size={20} />,
      description:
        "Ultimate experience with priority entry, exclusive backstage access, and front-row seats to every show. VIP guests are treated like royalty — terrifying royalty.",
      features: [
        "Priority Entry",
        "Exclusive Backstage Access",
        "Front-Row Show Seats",
        "All Regular Pass Perks",
      ],
      featured: true,
    },
    {
      name: "Touch Pass",
      price: "Upgrade",
      color: "oklch(0.40 0.15 300)",
      icon: <Zap size={20} />,
      description:
        "Unlocks special scare zones where creatures CAN interact with you. No mercy. You asked for it. Included with regular pass — just ask to upgrade.",
      features: [
        "Included with Regular",
        "Ask to Upgrade",
        "Creature Interaction",
        "Zero Mercy Policy",
      ],
    },
    {
      name: "Season Pass",
      price: "$70",
      color: "oklch(0.48 0.22 15)",
      icon: <Flame size={20} />,
      description:
        "Unlimited access for the entire 2026 haunt season. August 22nd through close. Show up as many times as your nerves allow.",
      features: [
        "Unlimited 2026 Season",
        "Aug 22 – Close",
        "All 4 Houses + Zones",
        "All Live Shows",
      ],
    },
  ];

  return (
    <section id="tickets" className="relative py-20 md:py-28 horror-bg-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Admission"
          title="Tickets & Passes"
          subtitle="Choose your fate. Each pass delivers a different kind of terror."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {passes.map((pass, i) => (
            <article
              key={pass.name}
              className="horror-card rounded-sm p-6 flex flex-col"
              data-ocid={`tickets.item.${i + 1}`}
              style={
                "featured" in pass && pass.featured
                  ? {
                      boxShadow:
                        "0 0 0 1px oklch(0.65 0.18 60 / 0.6), 0 0 24px oklch(0.65 0.18 60 / 0.15)",
                    }
                  : undefined
              }
            >
              {"featured" in pass && pass.featured && (
                <div
                  className="text-xs font-bold uppercase tracking-widest text-center py-1 -mx-6 -mt-6 mb-4 rounded-t-sm"
                  style={{
                    background: "oklch(0.65 0.18 60)",
                    color: "oklch(0.08 0.01 0)",
                  }}
                >
                  ★ Most Popular
                </div>
              )}
              <div
                className="w-12 h-12 rounded-sm flex items-center justify-center mb-4"
                style={{
                  background: "oklch(0.12 0.01 0)",
                  border: `1px solid ${pass.color}`,
                }}
              >
                <div style={{ color: pass.color }}>{pass.icon}</div>
              </div>
              <div
                className="font-display font-black text-3xl mb-1"
                style={{ color: pass.color }}
              >
                {pass.price}
              </div>
              <h3
                className="font-display font-bold uppercase text-sm tracking-wide mb-3"
                style={{ color: "oklch(0.97 0.01 80)" }}
              >
                {pass.name}
              </h3>
              <p
                className="text-xs leading-relaxed mb-4 flex-1"
                style={{ color: "oklch(0.82 0.03 60)" }}
              >
                {pass.description}
              </p>
              <ul className="space-y-1 mb-5">
                {pass.features.map((f) => (
                  <li
                    key={f}
                    className="text-xs flex items-center gap-2"
                    style={{ color: "oklch(0.85 0.03 60)" }}
                  >
                    <span style={{ color: pass.color }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                data-ocid={`tickets.pass.${i + 1}.primary_button`}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-200"
                style={{
                  background: pass.color,
                  color: "oklch(0.97 0.01 80)",
                  border: `1px solid ${pass.color}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                Select Pass
              </button>
            </article>
          ))}
        </div>

        {/* Merch callout */}
        <div
          className="mt-8 rounded-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "oklch(0.11 0.02 0)",
            border: "1px solid oklch(0.30 0.06 60 / 0.4)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
              style={{
                background: "oklch(0.22 0.06 50 / 0.4)",
                border: "1px solid oklch(0.45 0.14 60 / 0.4)",
              }}
            >
              <Star size={16} style={{ color: "oklch(0.72 0.18 60)" }} />
            </div>
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-0.5"
                style={{ color: "oklch(0.72 0.18 60)" }}
              >
                Official TCEA Merch — $13
              </div>
              <p className="text-xs" style={{ color: "oklch(0.78 0.03 60)" }}>
                Official TCEA merchandise including shirts, hoodies, and
                collectibles. Take a piece of the nightmare home.
              </p>
            </div>
          </div>
          <button
            type="button"
            data-ocid="tickets.merch.secondary_button"
            className="shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-opacity duration-200"
            style={{
              background: "oklch(0.22 0.06 50 / 0.5)",
              color: "oklch(0.85 0.14 60)",
              border: "1px solid oklch(0.45 0.14 60 / 0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            View Merch
          </button>
        </div>

        <div
          className="mt-8 rounded-sm p-6 text-center"
          style={{
            background: "oklch(0.10 0.02 22 / 0.7)",
            border: "1px solid oklch(0.55 0.22 25 / 0.3)",
          }}
        >
          <div
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "oklch(0.62 0.22 25)" }}
          >
            ⚠ Warning
          </div>
          <p className="text-sm" style={{ color: "oklch(0.85 0.03 60)" }}>
            TCEA Scream Fest contains extreme horror elements, strobe lighting,
            fog machines, loud sounds, and intense scare actors. Not recommended
            for guests with heart conditions, epilepsy, anxiety disorders, or
            those under 10 years of age. Enter at your own risk.
          </p>
        </div>
      </div>
    </section>
  );
}

function InfoSection() {
  return (
    <section id="info" className="relative py-20 md:py-24">
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.06 0.01 0)" }}
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Location */}
          <div
            className="rounded-sm p-6"
            style={{
              background: "oklch(0.11 0.01 0)",
              border: "1px solid oklch(0.22 0.04 25 / 0.5)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} style={{ color: "oklch(0.62 0.22 25)" }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.62 0.22 25)" }}
              >
                Location
              </span>
            </div>
            <p
              className="text-lg font-display font-bold"
              style={{ color: "oklch(0.97 0.01 80)" }}
            >
              Waterford, VA
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.72 0.06 60)" }}
            >
              The only extreme haunted scream park in the area.
            </p>
          </div>

          {/* Hours */}
          <div
            className="rounded-sm p-6"
            style={{
              background: "oklch(0.11 0.01 0)",
              border: "1px solid oklch(0.22 0.04 25 / 0.5)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock size={18} style={{ color: "oklch(0.62 0.22 25)" }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.62 0.22 25)" }}
              >
                Hours
              </span>
            </div>
            <p
              className="text-lg font-display font-bold"
              style={{ color: "oklch(0.97 0.01 80)" }}
            >
              Fri – Sun
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.72 0.06 60)" }}
            >
              5 PM until the last guest is out — or accounted for.
            </p>
          </div>

          {/* Procession time */}
          <div
            className="rounded-sm p-6"
            style={{
              background: "oklch(0.11 0.01 0)",
              border: "1px solid oklch(0.22 0.04 25 / 0.5)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Ghost size={18} style={{ color: "oklch(0.62 0.22 25)" }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.62 0.22 25)" }}
              >
                Procession
              </span>
            </div>
            <p
              className="text-lg font-display font-bold"
              style={{ color: "oklch(0.97 0.01 80)" }}
            >
              6:15 PM Sharp
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.72 0.06 60)" }}
            >
              Every operating night on the main plaza. Do not be late.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SponsorBar() {
  return (
    <div
      className="relative py-10"
      style={{
        background: "oklch(0.07 0.015 0)",
        borderTop: "1px solid oklch(0.22 0.04 25 / 0.4)",
        borderBottom: "1px solid oklch(0.22 0.04 25 / 0.4)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sinister Slide Gear */}
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
              style={{
                background: "oklch(0.18 0.04 0)",
                border: "1px solid oklch(0.55 0.22 25 / 0.4)",
              }}
            >
              <Zap size={16} style={{ color: "oklch(0.62 0.22 25)" }} />
            </div>
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.62 0.22 25)" }}
              >
                Official Sponsor
              </div>
              <div
                className="font-display font-bold text-sm uppercase mb-1"
                style={{ color: "oklch(0.97 0.01 80)" }}
              >
                Sinister Slide Gear
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.72 0.04 60)" }}
              >
                Sinister Slide Gear provides our performers with the highest
                quality sliding costumes and stunt equipment. The reason our
                sliders hit the ground so hard.
              </p>
            </div>
          </div>

          {/* Conventions */}
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
              style={{
                background: "oklch(0.18 0.04 0)",
                border: "1px solid oklch(0.45 0.18 50 / 0.4)",
              }}
            >
              <Star size={16} style={{ color: "oklch(0.65 0.18 60)" }} />
            </div>
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.65 0.18 60)" }}
              >
                Industry Presence · 2027
              </div>
              <div
                className="font-display font-bold text-sm uppercase mb-1"
                style={{ color: "oklch(0.97 0.01 80)" }}
              >
                Transworld &amp; East Coast Haunt
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.72 0.04 60)" }}
              >
                TCEA will be featured at the Transworld Haunt Industry
                Convention and East Coast Haunt Convention in 2027. See us on
                stage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuditionsSection() {
  const auditions = [
    {
      id: "scream-team",
      title: "Scream Team Auditions",
      subtitle: "Scare Actors · Sliders · Stilt Walkers · Chainsaws",
      date: "April 11–29, 2026 | 2–9 PM",
      color: "oklch(0.55 0.22 25)",
      icon: <Skull size={20} />,
      description:
        "We are building the ultimate Scream Team. Seeking sliders, stilt walkers, chainsaw operators, dancers, fire dancers, and general scare actors. All skill levels welcome. Come ready to scare.",
      requirements: null,
      ctaLabel: "Apply Now",
      ctaHref: "#auditions-form",
    },
    {
      id: "costume-characters",
      title: "Costume Character Team",
      subtitle: "Character Performers",
      date: "Coming March 2027",
      color: "oklch(0.45 0.18 50)",
      icon: <Star size={20} />,
      description:
        "Character performers needed for our beloved mascot characters. You must be at least 5'10\" and 200 lbs, available every weekend during the season. Energy, expressiveness, and showmanship required.",
      requirements: [
        "Min. Height: 5'10\"",
        "Min. Weight: 200 lbs",
        "All Weekends Required",
        "No Experience Needed",
      ],
      ctaLabel: "Learn More",
      ctaHref: "#auditions",
    },
    {
      id: "hh-supervisors",
      title: "Haunted House Supervisors",
      subtitle: "Leadership Roles",
      date: "Auditions in August 2026",
      color: "oklch(0.40 0.15 300)",
      icon: <Users size={20} />,
      description:
        "We need experienced leaders to supervise our haunted houses. No formal application required — just come to our August auditions and show us what you've got. Be vocal, be commanding, and be ready to lead a team of terrifying performers.",
      requirements: null,
      ctaLabel: "Just Show Up",
      ctaHref: "#auditions",
    },
  ];

  return (
    <section
      id="auditions"
      className="relative py-20 md:py-28"
      style={{ background: "oklch(0.05 0.02 22)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, oklch(0.55 0.22 25 / 0.4) 0px, oklch(0.55 0.22 25 / 0.4) 1px, transparent 1px, transparent 30px)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="We're Hiring"
          title="Join the Scream Team"
          subtitle="We're building the most terrifying team in Virginia. Are you what we're looking for?"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {auditions.map((aud, i) => (
            <article
              key={aud.id}
              className="horror-card rounded-sm p-6 flex flex-col"
              data-ocid={`auditions.item.${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-sm flex items-center justify-center mb-4"
                style={{
                  background: "oklch(0.12 0.01 0)",
                  border: `1px solid ${aud.color}`,
                }}
              >
                <div style={{ color: aud.color }}>{aud.icon}</div>
              </div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: aud.color }}
              >
                {aud.subtitle}
              </div>
              <h3
                className="font-display font-black uppercase leading-tight mb-1"
                style={{ fontSize: "1.15rem", color: "oklch(0.97 0.01 80)" }}
              >
                {aud.title}
              </h3>
              <div
                className="text-xs font-medium mb-4 flex items-center gap-1"
                style={{ color: "oklch(0.72 0.06 60)" }}
              >
                <Clock size={11} />
                {aud.date}
              </div>
              <p
                className="text-sm leading-relaxed mb-4 flex-1"
                style={{ color: "oklch(0.85 0.03 60)" }}
              >
                {aud.description}
              </p>
              {aud.requirements && (
                <ul className="space-y-1.5 mb-5">
                  {aud.requirements.map((r) => (
                    <li
                      key={r}
                      className="text-xs flex items-center gap-2"
                      style={{ color: "oklch(0.85 0.03 60)" }}
                    >
                      <span style={{ color: aud.color }}>→</span>
                      {r}
                    </li>
                  ))}
                </ul>
              )}
              <a
                href={aud.ctaHref}
                data-ocid={`auditions.${aud.id}.primary_button`}
                className="mt-auto block w-full py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm text-center transition-opacity duration-200"
                style={{
                  background: aud.color,
                  color: "oklch(0.97 0.01 80)",
                  border: `1px solid ${aud.color}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                {aud.ctaLabel}
              </a>
            </article>
          ))}
        </div>

        {/* Audition form anchor */}
        <div id="auditions-form" className="mt-14">
          <div
            className="rounded-sm p-8 text-center"
            style={{
              background: "oklch(0.10 0.02 22 / 0.8)",
              border: "1px solid oklch(0.55 0.22 25 / 0.35)",
            }}
          >
            <Skull
              size={28}
              className="mx-auto mb-4"
              style={{ color: "oklch(0.62 0.22 25)" }}
            />
            <h3
              className="font-display font-black uppercase text-2xl mb-2"
              style={{ color: "oklch(0.97 0.01 80)" }}
            >
              Ready to Audition?
            </h3>
            <p
              className="text-sm max-w-md mx-auto mb-6"
              style={{ color: "oklch(0.78 0.04 60)" }}
            >
              Show up with your energy, your fearlessness, and your commitment.
              We'll handle the rest. TCEA Scream Fest — April 11–29, 2026 in
              Waterford, VA.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Sliders",
                "Chainsaw Operators",
                "Stilt Walkers",
                "Dancers",
                "Fire Dancers",
                "Scare Actors",
              ].map((role) => (
                <span
                  key={role}
                  className="text-xs px-3 py-1 rounded-sm font-medium uppercase tracking-wide"
                  style={{
                    background: "oklch(0.55 0.22 25 / 0.15)",
                    border: "1px solid oklch(0.55 0.22 25 / 0.35)",
                    color: "oklch(0.85 0.04 60)",
                  }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative"
      style={{
        background: "oklch(0.05 0.015 0)",
        borderTop: "1px solid oklch(0.22 0.04 25 / 0.4)",
      }}
    >
      {/* Blood drip at top of footer */}
      <div style={{ transform: "rotate(180deg)" }}>
        <BloodDripHeader />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/tcea-logo-transparent.dim_400x200.png"
              alt="TCEA Scream Fest"
              className="h-14 w-auto mb-4"
            />
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.65 0.04 60)" }}
            >
              The only extreme haunted carnival scream park in Waterford, VA.
              Five houses of pure terror. Four scare zones. Three live shows.
              Endless nightmares.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.62 0.22 25)" }}
            >
              Navigate
            </div>
            <div className="flex flex-col gap-2">
              {[
                "Haunted Houses",
                "Scare Zones",
                "Shows",
                "Events",
                "Characters",
                "Food Booths",
                "Attractions",
                "Auditions",
                "Tickets",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  data-ocid={`footer.${item.toLowerCase().replace(/\s+/g, "-")}.link`}
                  className="text-sm transition-colors duration-200"
                  style={{ color: "oklch(0.65 0.04 60)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "oklch(0.72 0.18 60)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "oklch(0.65 0.04 60)";
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.62 0.22 25)" }}
            >
              Visit Us
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin
                  size={14}
                  style={{
                    color: "oklch(0.62 0.22 25)",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
                <span
                  className="text-sm"
                  style={{ color: "oklch(0.65 0.04 60)" }}
                >
                  Waterford, Virginia
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock
                  size={14}
                  style={{
                    color: "oklch(0.62 0.22 25)",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
                <span
                  className="text-sm"
                  style={{ color: "oklch(0.65 0.04 60)" }}
                >
                  Friday – Sunday, 5 PM til close
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Ghost
                  size={14}
                  style={{
                    color: "oklch(0.62 0.22 25)",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
                <span
                  className="text-sm"
                  style={{ color: "oklch(0.65 0.04 60)" }}
                >
                  Procession at 6:15 PM every night
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="blood-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "oklch(0.50 0.03 60)" }}>
            © {year} TCEA Scream Fest. All nightmares reserved. Waterford, VA.
          </p>
          <p className="text-xs" style={{ color: "oklch(0.45 0.03 60)" }}>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "oklch(0.55 0.10 60)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(0.72 0.18 60)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(0.55 0.10 60)";
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Active Section Observer ────────────────────────────────────────────────────

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  return activeSection;
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const activeSection = useActiveSection();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Chainsaw audio autoplay
  useEffect(() => {
    const tryPlay = () => {
      if (!audioRef.current) return;
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {
        // Fallback: try on first interaction
        const unlock = () => {
          audioRef.current?.play().catch(() => {});
          document.removeEventListener("click", unlock);
          document.removeEventListener("touchstart", unlock);
        };
        document.addEventListener("click", unlock);
        document.addEventListener("touchstart", unlock);
      });
    };
    // Slight delay to not compete with page render
    const t = setTimeout(tryPlay, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "oklch(0.08 0.01 0)" }}
    >
      {/* Chainsaw audio - hidden, loops automatically */}
      {/* biome-ignore lint/a11y/useMediaCaption: background horror ambience, no spoken content */}
      <audio ref={audioRef} loop preload="none" style={{ display: "none" }} />

      <NavBar activeSection={activeSection} />

      <main>
        <HeroSection />
        <HauntedHousesSection />
        <ScareZonesSection />
        <ShowsSection />
        <EventsSection />
        <ProcessionSection />
        <CharactersSection />
        <AttractionsSection />
        <FoodBoothsSection />
        <TicketsSection />
        <AuditionsSection />
        <InfoSection />
      </main>

      <SponsorBar />
      <Footer />
    </div>
  );
}
