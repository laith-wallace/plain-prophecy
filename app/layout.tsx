import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Sans, IBM_Plex_Mono, Geist } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ibm-plex-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plainprophecy.com"),
  title: {
    default: "Plain Prophecy — Biblical Prophecy, Plain and Simple",
    template: "%s | Plain Prophecy",
  },
  description:
    "A rigorous, Christ-centred resource for understanding biblical prophecy. Compare Futurism and Historicism through Scripture, history, and the Reformation consensus.",
  keywords: [
    "biblical prophecy",
    "futurism vs historicism",
    "Daniel 9 70 weeks",
    "1260 years prophecy",
    "who is the antichrist",
    "mark of the beast explained",
    "dispensationalism",
    "Reformation prophecy",
    "historicism explained",
    "plain prophecy",
    "bible prophecy simple",
    "Revelation explained",
    "Daniel explained",
  ],
  authors: [{ name: "Plain Prophecy" }],
  creator: "Plain Prophecy",
  publisher: "Plain Prophecy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://plainprophecy.com",
  },
  openGraph: {
    title: "Plain Prophecy — Biblical Prophecy, Plain and Simple",
    description:
      "Biblical prophecy examined through Scripture, history, and the Reformation tradition. Futurism vs Historicism — rigorously compared.",
    url: "https://plainprophecy.com",
    siteName: "Plain Prophecy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Plain Prophecy — Biblical Prophecy, Plain and Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plain Prophecy — Biblical Prophecy, Plain and Simple",
    description:
      "Biblical prophecy examined through Scripture, history, and the Reformation tradition.",
    images: ["/og/og-default.png"],
    site: "@plainprophecy",
    creator: "@plainprophecy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(playfair.variable, ibmPlexSans.variable, ibmPlexMono.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <ConvexClientProvider>
          <SiteNav />
          {children}
          <SiteFooter />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
