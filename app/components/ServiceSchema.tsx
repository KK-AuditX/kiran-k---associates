import { services } from '@/app/data/services';

/**
 * Server component — outputs a JSON-LD script tag for Google's Service schema.
 * Rendered inside <head> or at page level; zero client JS cost.
 */
export function ServiceSchema() {
  const schema = {
    '@context':  'https://schema.org',
    '@type':     'ItemList',
    name:        'Kiran K & Associates — CA Services',
    description: 'Comprehensive audit, forensic, risk and compliance services for modern businesses.',
    url:         'https://kka.co.in/#services',
    itemListElement: services.map((s, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      item: {
        '@type':       'Service',
        '@id':         `https://kka.co.in/services/${s.id}`,
        name:          s.title,
        description:   s.longDescription,
        serviceType:   s.title,
        provider: {
          '@type': 'AccountingService',
          name:    'Kiran K & Associates',
          url:     'https://kka.co.in',
        },
        areaServed: {
          '@type': 'Country',
          name:    'India',
        },
        audience: {
          '@type':       'Audience',
          audienceType:  s.industries.join(', '),
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
