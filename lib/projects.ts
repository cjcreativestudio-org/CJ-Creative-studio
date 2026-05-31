export interface Project {
  name: string;
  type: string;
  img: string;
  color: string;
  enter: { x?: number; y?: number; opacity: number };
}

export const projects: Project[] = [
  {
    name: "Maple & Co",
    type: "Restaurant",
    img: "https://picsum.photos/seed/modern-restaurant-interior/800/600",
    color: "from-amber-100/80 to-orange-100/80",
    enter: { x: -40, opacity: 0 },
  },
  {
    name: "Northfield Law",
    type: "Legal Services",
    img: "https://picsum.photos/seed/law-office-minimal/800/600",
    color: "from-slate-100/80 to-blue-100/80",
    enter: { y: 48, opacity: 0 },
  },
  {
    name: "Bloom Studio",
    type: "Photography",
    img: "https://picsum.photos/seed/photography-studio-light/800/600",
    color: "from-rose-100/80 to-pink-100/80",
    enter: { x: 40, opacity: 0 },
  },
];
