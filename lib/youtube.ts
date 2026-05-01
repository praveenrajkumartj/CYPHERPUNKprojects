/**
 * Utility for handling YouTube URLs and extracting metadata
 */

/**
 * Extracts the 11-character YouTube video ID from various URL formats
 */
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  
  // Regex covers:
  // - youtube.com/watch?v=ID
  // - youtube.com/embed/ID
  // - youtube.com/v/ID
  // - youtu.be/ID
  // - youtube.com/shorts/ID
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  
  return match ? match[1] : null;
}

/**
 * Generates a high-quality thumbnail URL for a given YouTube URL or ID
 */
export function getYouTubeThumbnail(urlOrId: string): string {
  const id = urlOrId.length === 11 ? urlOrId : getYouTubeId(urlOrId);
  if (!id) return '';
  
  // hqdefault is the most reliable high-quality thumbnail
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/**
 * Converts any YouTube URL into a proper embed URL
 */
export function getYouTubeEmbedUrl(url: string, autoplay: boolean = false): string {
  const id = getYouTubeId(url);
  if (!id) return url;
  
  let embedUrl = `https://www.youtube.com/embed/${id}`;
  if (autoplay) {
    embedUrl += '?autoplay=1&mute=1';
  }
  
  return embedUrl;
}
