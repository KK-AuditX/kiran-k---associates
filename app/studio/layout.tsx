/**
 * Isolated layout for Sanity Studio — no Navbar/Footer wrapping.
 * This overrides the root layout for all /studio/* routes.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
