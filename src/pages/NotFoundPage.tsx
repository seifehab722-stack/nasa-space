import React from 'react';
import { ArrowLeft, Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { usePageMeta } from '../utils/seo';

export const NotFoundPage: React.FC = () => {
  usePageMeta({
    title: 'Coordinates Not Found (404)',
    description: 'The requested sector in BEYOND RELICS could not be located.',
  });

  return (
    <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="max-w-lg w-full p-8 sm:p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#35D5F2]/30 bg-[#102A43] text-[#35D5F2]">
          <Compass className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#35D5F2]">
          Error 404
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#EAF4FF]">
          Coordinates Off the Chart
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#EAF4FF]/75 leading-relaxed">
          COSMO’s navigation sensors could not locate this page. Return to the observatory home screen or open the comic library.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button to="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Button>
          <Button to="/comic" variant="secondary">
            <span>Open Comic Library</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
