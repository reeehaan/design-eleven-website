import { siteConfig } from "./site";
import type { Project } from "./projects";
import type { Service } from "./services";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    foundingDate: siteConfig.established.toString(),
    founder: {
      "@type": "Person",
      name: siteConfig.owner,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.contact.address.city,
      addressCountry: "LK",
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    knowsAbout: [
      "Residential Construction",
      "Commercial Construction",
      "Interior Finishing",
      "Renovation",
    ],
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services#${service.slug}`,
    serviceType: service.title,
    name: service.title,
    description: service.summary,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "LKR",
    },
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteConfig.url}/projects/${project.slug}`,
    image: project.cover.src,
    creator: {
      "@id": `${siteConfig.url}/#organization`,
    },
    dateCreated: `${project.year}`,
    locationCreated: {
      "@type": "Place",
      name: project.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location,
        addressCountry: "LK",
      },
    },
    about: project.category,
  };
}

export type Crumb = { name: string; url: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export type FaqEntry = { question: string; answer: string };

export function faqSchema(faqs: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
