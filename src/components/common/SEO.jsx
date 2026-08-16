import React, { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

export function SEO({ title, description, image, url }) {
  const siteTitle = title ? `${title} | Harsh Sharma` : 'Harsh Sharma – Full Stack Developer & AI Integrator';
  const siteDesc = description || 'MCA student at LPU. Full Stack Developer specializing in React, Firebase, Java, and AI integration. Building scalable web applications with modern UI.';
  const siteImage = image || 'https://harshportfolio-dd147.firebasestorage.app/og-image.png';
  const siteUrl = url || 'https://harsh-portfolio.vercel.app';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDesc} />
      <meta name="keywords" content="Harsh Sharma, Full Stack Developer, React Developer, Firebase, Java, AI Integration, LPU, Portfolio" />
      <meta name="author" content="Harsh Sharma" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDesc} />
      <meta property="twitter:image" content={siteImage} />

      {/* Canonical */}
      <link rel="canonical" href={siteUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    </Helmet>
  );
}

export default SEO;
