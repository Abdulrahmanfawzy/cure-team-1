const API_ORIGIN = "https://round-13-cure.huma-volve.com";

export function getImageUrl(path?: string | null): string {
  if (!path) {
    return "";
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${API_ORIGIN}/${path.replace(/^\/+/, "")}`;
}