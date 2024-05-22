import "./globals.scss";
import type { Metadata } from "next";
import ThemeProvider from "@/app/components/ThemeProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Token Utility",
  description:
    "Token Utility is an innovative protocol that enables utilities for all tokens.",
  metadataBase: new URL("https://www.tokenutility.io/"),
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    url: "https://tokenutility.io/",
    title:
      "Token Utility",
    description:
      "Token Utility is an innovative protocol that enables utilities for all tokens.",
    siteName: "Token Utility",
    images: [
      {
        url: "/og.png",
      },
    ],
  },
  icons: {
    other: {
      url: "/favicon.ico",
      type: "image/x-icon",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head><link rel="canonical" href="https://www.tokenutility.io/"  />
      <link href="https://cdn.flowx.finance/swap-widget/0.0.8/main.css" rel="stylesheet"  /></head>
      {/* <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script> */}
      <Script
        strategy="afterInteractive"
        src="https://cdn.flowx.finance/swap-widget/0.0.8/main.js"
      ></Script>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
