export type MediaItem = {
  id: string;
  type: 'photo' | 'video';
  src: string;
  thumb?: string;
  caption?: string;
  date?: string; // ISO string for timeline
  note?: string;
};

// Edit these arrays with your real media paths (e.g., place files in public/media/)
export const PHOTOS: MediaItem[] = [
  { id: 'p1', type: 'photo', src: '/media/photos/data/WhatsApp Image 2025-08-09 at 07.54.14_1514955c.jpg', caption: 'Galti se Sundar Dikhne wali', note: 'Sundar tu hai but usse zyada Moti haii!' },
  { id: 'p2', type: 'photo', src: '/media/photos/data/WhatsApp Image 2025-08-09 at 07.55.03_b7fb4ab4.jpg', caption: 'NOTHING BUT CHICKEN', note: 'Ghar se kidnap karke mujhe Burger khilaya tha!😂' },
  { id: 'p3', type: 'photo', src: '/media/photos/data/WhatsApp Image 2025-08-09 at 07.58.57_614f9862.jpg', caption: 'Surprise!! ', note: 'Proud sibling moment.' },
  { id: 'p4', type: 'photo', src: '/media/photos/data/Screenshot 2025-08-09 075001jpg', caption: 'Cutie Dance', note: 'Nach Basanti Nach!' },
];

export const VIDEOS: MediaItem[] = [
  { id: 'v1', type: 'video', src: '/media/videos/WhatsApp Video 2025-08-09 at 08.04.19_d98d5980.mp4', caption: 'Swimmer Pro/ DEATH DIVE', note: 'Still Lost to me' },
  { id: 'v2', type: 'video', src: '/media/videos/WhatsApp Video 2025-08-09 at 08.01.10_5c1ff75d.mp4', caption: 'Sammy Boiii', note: 'Kon video nikal raha??!!' },
];
