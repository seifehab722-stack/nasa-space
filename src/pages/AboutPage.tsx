import React from 'react';
import { ExternalLink, Mail } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import {
  CHALLENGE_INFO,
  IMAGE_CREDITS,
  OFFICIAL_SOURCE_GROUPS,
  PROJECT_CONTACT,
} from '../data/about';
import { usePageMeta } from '../utils/seo';

export const AboutPage: React.FC = () => {
  usePageMeta({
    title: 'About Us & Scientific Sources',
    description:
      'Inspect the educational mission, official space science sources, and image credits behind BEYOND RELICS.',
    path: '/about',
  });

  const hasContact =
    Boolean(PROJECT_CONTACT.email) ||
    Boolean(PROJECT_CONTACT.github) ||
    Boolean(PROJECT_CONTACT.website);

  return (
    <div className="relative z-10 mx-auto max-w-[1100px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 space-y-16">
      {/* Project Summary */}
      <section aria-labelledby="about-summary">
        <SectionHeader
          eyebrow="About BEYOND RELICS"
          title="Storytelling Grounded in Verified Astronomy"
          description="BEYOND RELICS is an independent educational comic and interactive space exploration platform created for the NASA Space Apps Challenge, pairing original comic storytelling with cited NASA mission archives and astronomy resources."
        />

        <Card className="mt-8 p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-2">
                Project Identity
              </p>
              <p className="text-sm sm:text-base text-[#EAF4FF]/80 leading-relaxed">
                Developed for the <strong className="text-[#EAF4FF]">{CHALLENGE_INFO.event}</strong> ({CHALLENGE_INFO.challengeName}), BEYOND RELICS makes foundational astrophysics inviting for students, teachers, and general readers.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-2">
                Independence Statement
              </p>
              <p className="text-sm sm:text-base text-[#EAF4FF]/80 leading-relaxed">
                BEYOND RELICS is an independent educational project created for the NASA Space Apps Challenge. It is not affiliated with or endorsed by NASA.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Scientific Sources */}
      <section id="sources" aria-labelledby="about-sources">
        <SectionHeader
          eyebrow="References"
          title="Official Scientific Sources"
          description="Official space agency, observatory, and archive portals referenced across BEYOND RELICS."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {OFFICIAL_SOURCE_GROUPS.map((group) => (
            <Card key={group.groupTitle} className="p-6 sm:p-7">
              <h3 className="font-display text-xl font-semibold text-[#EAF4FF]">
                {group.groupTitle}
              </h3>
              <p className="mt-1.5 text-sm text-[#EAF4FF]/68">{group.description}</p>

              <ul className="mt-5 space-y-3 border-t border-[#35D5F2]/12 pt-5">
                {group.items.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-[10px] border border-[#35D5F2]/12 bg-[#05080D]/60 px-4 py-3 hover:border-[#35D5F2]/45 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-[#35D5F2]">
                          {item.publisher}
                        </p>
                        <p className="text-sm font-medium text-[#EAF4FF] truncate">
                          {item.title}
                        </p>
                      </div>
                      <ExternalLink
                        className="h-4 w-4 shrink-0 text-[#EAF4FF]/55 group-hover:text-[#35D5F2]"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Image Credits */}
      <section id="credits" aria-labelledby="about-credits">
        <SectionHeader
          eyebrow="Attribution"
          title="Image Credits"
          description="Attribution and placement details for space imagery used across the platform."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {IMAGE_CREDITS.map((item, idx) => (
            <Card key={idx} className="p-4 flex items-center gap-4">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`h-16 w-24 shrink-0 rounded-[8px] border border-[#35D5F2]/15 bg-[#05080D] ${
                  item.src.includes('/characters/cosmo/') ? 'object-contain p-1' : 'object-cover'
                }`}
              />
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-[#EAF4FF] truncate">
                  {item.alt}
                </p>
                <p className="mt-0.5 text-xs text-[#EAF4FF]/70">{item.caption}</p>
                <p className="mt-1 font-mono text-[11px] text-[#35D5F2]/85">
                  {item.credit}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Conditional Contact Section — rendered only when real contact details exist */}
      {hasContact && (
        <section aria-labelledby="about-contact">
          <Card className="p-6 sm:p-8">
            <h2
              id="about-contact"
              className="font-display text-2xl font-semibold text-[#EAF4FF] mb-4"
            >
              Contact
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {PROJECT_CONTACT.email && (
                <a
                  href={`mailto:${PROJECT_CONTACT.email}`}
                  className="inline-flex items-center gap-2 text-[#35D5F2] hover:underline"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{PROJECT_CONTACT.email}</span>
                </a>
              )}
              {PROJECT_CONTACT.github && (
                <a
                  href={PROJECT_CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#35D5F2] hover:underline"
                >
                  <span>Repository</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {PROJECT_CONTACT.website && (
                <a
                  href={PROJECT_CONTACT.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#35D5F2] hover:underline"
                >
                  <span>Project Website</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </Card>
        </section>
      )}
    </div>
  );
};
