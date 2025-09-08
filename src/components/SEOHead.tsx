import React from "react";
import { Helmet } from "react-helmet-async";
import { SEOData, defaultSEO, structuredData } from "../utils/seo";

interface SEOHeadProps {
  seo?: Partial<SEOData>;
  type?: "website" | "article"; // og:type flexibility
  schema?: object; // custom structured data per page
}

const SEOHead: React.FC<SEOHeadProps> = ({
  seo,
  type = "website",
  schema,
}) => {
  const seoData = { ...defaultSEO, ...seo };

  // Merge base schema with custom schema if provided
  const mergedSchema = schema
    ? { ...structuredData.organization, ...schema }
    : structuredData.organization;

  return (
    <Helmet>
      {/* HTML Lang */}
      <html lang="en" />

      {/* Primary Meta */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      {seoData.image && <meta property="og:image" content={seoData.image} />}
      <meta property="og:site_name" content="Younick Design Studio" />
      {seoData.url && <meta property="og:url" content={seoData.url} />}
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      {seoData.image && <meta name="twitter:image" content={seoData.image} />}
      <meta name="twitter:creator" content="@younickstudio" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(mergedSchema)}
      </script>

      {/* Additional Meta */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Younick Design Studio" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0D0D0D" />
      <link rel="canonical" href={seoData.url || "https://younickdesign.com"} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEOHead;
