import type { FeaturedImage as FeaturedImageContent } from "@/content/types";

// Every variant is generated at build-prep time into /public/images/guides.
export const FEATURED_IMAGE_WIDTHS = [400, 800, 1200] as const;
export const FEATURED_IMAGE_WIDTH = 1200;
export const FEATURED_IMAGE_HEIGHT = 630;

export const featuredImagePath = (file: string, width = FEATURED_IMAGE_WIDTH, ext = "jpg") =>
  `/images/guides/${file}-${width}.${ext}`;

const srcSetFor = (file: string, ext: string) =>
  FEATURED_IMAGE_WIDTHS.map((width) => `${featuredImagePath(file, width, ext)} ${width}w`).join(", ");

interface FeaturedImageProps {
  image: FeaturedImageContent;
  /** Above-the-fold hero images are the LCP element, so never lazy-load them. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export default function FeaturedImage({
  image,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 768px",
  className = "",
}: FeaturedImageProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSetFor(image.file, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSetFor(image.file, "webp")} sizes={sizes} />
      {/* Static export has no image optimizer; every variant is pre-generated. */}
      <img
        src={featuredImagePath(image.file)}
        alt={image.alt}
        width={FEATURED_IMAGE_WIDTH}
        height={FEATURED_IMAGE_HEIGHT}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        className={`h-auto w-full object-cover ${className}`}
      />
    </picture>
  );
}
