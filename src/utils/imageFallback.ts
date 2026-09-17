export const DEFAULT_IMAGES = {
  project: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop',
  event: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
  gallery: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop',
  news: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',
  pillar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop'
};

export function getSafeImageUrl(url: string | undefined | null, fallbackType: keyof typeof DEFAULT_IMAGES = 'project'): string {
  if (url && typeof url === 'string' && url.trim().length > 0) {
    return url;
  }
  return DEFAULT_IMAGES[fallbackType];
}
