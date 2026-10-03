import type { Metadata } from "next";
import { Cormorant, Outfit } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "The Adire Renova, hand-dyed adire fabrics from Kaduna",
    template: "%s, The Adire Renova",
  },
  description:
    "Hand-dyed adire and African fabrics, made in Kaduna, Nigeria. Shop adire eleko, kampala and oniko by the yard. Nationwide delivery, pay in naira.",
};

/*
  THESIS: The cloth is the hero. An editorial textile-house page where large fabric
  photography leads and commerce rides quietly in its own vocabulary — the opposite
  of a grid-of-cards marketplace.
  OWN-WORLD: Warm cream ground, deep green structural sections, one orange spark for
  action. Cormorant display with italic accents over Outfit UI text. 1px sand borders,
  shadows only on floating layers.
  STORY: Hand-dyed in Kaduna, no two alike, buy in naira with Paystack. One action
  above the fold: Shop fabrics.
  FIRST VIEWPORT: Asymmetric split — headline left (2 lines, staggered word reveal),
  full-bleed fabric image right with slow parallax; primary CTA under the headline.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish
  review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
*/
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
