import { Helmet } from 'react-helmet-async';

interface ReactHelmetProps {
  metaTitle: string;
  metaDescription: string;
  completeURL: string;
}

const ReactHelmet = ({ metaTitle, metaDescription, completeURL }: ReactHelmetProps) => (
  <Helmet>
    <title>{metaTitle}</title>
    <link rel="canonical" href={completeURL} />
    <meta name="description" content={metaDescription} />
    <meta property="og:title" content={metaTitle} />
    <meta property="og:description" content={metaDescription} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={completeURL} />
    <meta property="og:locale" content="es_ES" />
  </Helmet>
);

export { ReactHelmet };
