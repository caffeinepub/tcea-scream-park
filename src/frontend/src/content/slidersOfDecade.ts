export interface SliderItem {
  id: number;
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  description: string;
}

export const slidersOfDecadeItems: SliderItem[] = [
  {
    id: 1,
    type: "image",
    src: "/assets/generated/sliders-of-decade-slide-01.dim_1400x900.jpg",
    title: "Decade of Terror - Slide 1",
    description: "Experience the evolution of fear through the decades",
  },
  {
    id: 2,
    type: "video",
    src: "/assets/video/sliders-of-decade-slide-vid-01.mp4",
    poster: "/assets/generated/sliders-of-decade-slide-02.dim_1400x900.jpg",
    title: "Decade of Terror - Video",
    description: "Watch the haunting journey through time",
  },
  {
    id: 3,
    type: "image",
    src: "/assets/generated/sliders-of-decade-slide-02.dim_1400x900.jpg",
    title: "Decade of Terror - Slide 2",
    description: "Witness the transformation of horror",
  },
  {
    id: 4,
    type: "image",
    src: "/assets/generated/sliders-of-decade-slide-03.dim_1400x900.jpg",
    title: "Decade of Terror - Slide 3",
    description: "Relive the most terrifying moments",
  },
];

export const slidersOfDecadeTitle = "Sliders of Decade";
export const slidersOfDecadeSubtitle =
  "A haunt season show featuring the most terrifying moments through the years";
