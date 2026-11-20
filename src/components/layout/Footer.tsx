import React from 'react';
import { Link } from 'react-router-dom';
import { BrandWordmark } from '../ui/BrandWordmark';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-[#EAF4FF]/10 bg-[#000000]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="inline-block">
              <BrandWordmark />
            </Link>
            <p className="mt-3 text-sm sm:text-base text-[#EAF4FF]/78 max-w-md">
              Discover the Universe. Uncover Its Secrets.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[#EAF4FF]/55 max-w-md">
              BEYOND RELICS is an independent educational project created for the NASA Space Apps Challenge. It is not affiliated with or endorsed by NASA.
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-4">
              Expedition
            </h2>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm text-[#EAF4FF]/75">
              <li>
                <Link to="/" className="hover:text-[#35D5F2] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/comic" className="hover:text-[#35D5F2] transition-colors">
                  The Comic
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-[#35D5F2] transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/mission" className="hover:text-[#35D5F2] transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#35D5F2] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-[#35D5F2] mb-4">
              References
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm text-[#EAF4FF]/75">
              <li>
                <Link to="/about#sources" className="hover:text-[#35D5F2] transition-colors">
                  Scientific Sources
                </Link>
              </li>
              <li>
                <Link to="/about#credits" className="hover:text-[#35D5F2] transition-colors">
                  Image Credits
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#EAF4FF]/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#EAF4FF]/48">
          <span>BEYOND RELICS · Featuring COSMO</span>
          <span>Local browser progress only · No account required</span>
        </div>
      </div>
    </footer>
  );
};
