import { PATHS } from "@/app/router";
import type {
  ReactNode,
} from "react";
import {
  HeartPulse,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import facebookIcon from "@/assets/facebook.png";
import whatsappIcon from "@/assets/whatsapp.png";
import youtubeIcon from "@/assets/youtube.png";
import linkedinIcon from "@/assets/linkedin.png";
const companyLinks = [
  { label: "Doctors", to: "/doctors" },
  { label: "FAQs", to: "/faq" },
  { label: "Contact Us", to: PATHS.contact },
];

const supportLinks = [
  { label: "Help Center", to: "/help" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];
const socialLinks = [
  {
    label: "Facebook",
    image: facebookIcon,
    href: "#",
  },
  {
    label: "Instagram",
    image: whatsappIcon,
    href: "#",
  },
  {
    label: "YouTube",
    image: youtubeIcon,
    href: "#",
  },
  {
    label: "LinkedIn",
    image: linkedinIcon,
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="bg-app-secondary text-white mt-10">
      <div className="main_contaoner ">
        {/* Footer content */}
        <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="mb-4 flex items-center gap-2"
              aria-label="Cure home"
            >
              <HeartPulse size={35} strokeWidth={1.8} />

              <span className="font-noto-serif-georgian text-2xl">
                Cure
              </span>
            </Link>

            <p className=" leading-5 text-white">
              Cure helps you find trusted doctors, book appointments, and
              manage your health quickly and easily.
            </p>

            {/* Social links */}
           <div className="mt-5 flex items-center gap-2">
  {socialLinks.map((social) => (
    <a
      key={social.label}
      href={social.href}
      aria-label={social.label}
      target="_blank"
      rel="noreferrer"
      className="
        flex size-8.5
        items-center justify-center
        rounded-sm
        bg-white
        transition-transform
        hover:scale-105
      "
    >
      <img
        src={social.image}
        alt=""
        aria-hidden="true"
      />
    </a>
  ))}
</div>
          </div>

          {/* Company */}
          <FooterColumn
            title="Company"
            links={companyLinks}
          />

          {/* Support */}
          <FooterColumn
            title="Support"
            links={supportLinks}
          />

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-noto-serif-georgian text-sm">
              Contact Info
            </h3>

            <div className="space-y-3 text-xs text-white">
              <ContactItem icon={<Phone size={13} />}>
                +1 800 747 5528
              </ContactItem>

              <ContactItem icon={<Mail size={13} />}>
                cure@cureapp.com
              </ContactItem>

              <ContactItem icon={<MapPin size={13} />}>
                <span>
                  526 Myrtle Street
                  <br />
                  Water Mill, NY 11976
                </span>
              </ContactItem>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3  py-5 text-[11px] text-white sm:flex-row sm:items-center sm:justify-between">
          <p>©2024 Cure - All Rights Reserved</p>

          <p>Terms & Conditions | Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: {
    label: string;
    to: string;
  }[];
}

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 font-noto-serif-georgian text-sm">
        {title}
      </h3>

      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="
              text-xs text-white
              transition-colors
              hover:text-white/70
            "
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

interface ContactItemProps {
  icon: ReactNode;
  children: ReactNode;
}

function ContactItem({
  icon,
  children,
}: ContactItemProps) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0">
        {icon}
      </span>

      <span>{children}</span>
    </div>
  );
}

