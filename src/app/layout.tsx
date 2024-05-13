import "./globals.scss";
import type { Metadata } from "next";
import ThemeProvider from "@/app/components/ThemeProvider";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title:
    "Token Utility",
  description:
    "Token Utility",
  metadataBase: new URL("https://www.givefund.io/"),
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    url: "https://givefund.io/",
    title:
      "Token Utility",
    description:
      "Token Utility",
    siteName: "Token Utility",
    images: [
      {
        url: "/og.png",
      },
    ],
  },
  icons: {
    other: {
      url: "/favicon.png",
      type: "image/png",
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
      <meta
        name="google-site-verification"
        content="3vOcTg4_XxgkxA2v06byg1FYgCbjGLTyNvRVZ5jOjRY"
      />
      <link rel="canonical" href="https://www.givefund.io/"  />
      <link href="https://cdn.flowx.finance/swap-widget/0.0.8/main.css" rel="stylesheet"  />
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
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
