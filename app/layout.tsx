import type { Metadata, Viewport } from "next";
import { Playfair_Display, IBM_Plex_Sans, IBM_Plex_Mono, Geist, Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import PublicShell from "@/components/layout/PublicShell";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ibm-plex-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
    "Daniel studies",
    "the 2300 days",
    "70 weeks prophecy",
    "little horn",
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
    locale: "en_GB",
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
    <ConvexAuthNextjsServerProvider>
      <html
        lang="en-GB"
        className={cn(playfair.variable, ibmPlexSans.variable, ibmPlexMono.variable, "font-sans", geist.variable, cinzel.variable, inter.variable)}
        suppressHydrationWarning
      >
        <body className="antialiased" suppressHydrationWarning>
          <ConvexClientProvider>
            <PublicShell>
              {children}
            </PublicShell>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
