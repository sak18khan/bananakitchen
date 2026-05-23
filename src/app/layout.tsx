import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Banana or Not? 🍌 Daily Food Judgment Game",
  description: "Is this a crime or just creative? Vote on bizarre food combinations every day. Acceptable (Banana) or Criminal (Not)? See what people think!",
  metadataBase: new URL("https://bananakitchen.in"),
  openGraph: {
    title: "Banana or Not? 🍌 Daily Food Judgment Game",
    description: "Vote on bizarre food combinations every day. Acceptable or Criminal?",
    url: "https://bananakitchen.in",
    siteName: "Banana Kitchen",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Banana or Not? 🍌 Daily Food Judgment Game",
    description: "Vote on bizarre food combinations every day. Acceptable or Criminal?",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${nunito.variable} antialiased`}>
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="bg-banana-bg text-banana-dark font-sans min-h-screen flex flex-col selection:bg-banana-yellow/30">
        <div className="flex-1 flex flex-col w-full max-w-[480px] mx-auto px-4 py-6 md:py-12 justify-between">
          {children}
        </div>
      </body>
    </html>
  );
}
