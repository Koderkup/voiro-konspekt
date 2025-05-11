import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
const inter = Inter({ subsets: ["latin"] });
import { Provider } from "../components/ui/provider";
import Header from "../components/header/Header"; 
import Footer from "../components/footer/Footer";
import { Flex, Box } from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";
const APP_NAME = "VOIRO KONSPEKT";
const APP_DEFAULT_TITLE = "VOIRO KONSPEKT";
const APP_TITLE_TEMPLATE = "%s - VOIRO KONSPEKT";
const APP_DESCRIPTION = "VOIRO KONSPEKT - КОНСПЕКТ на любом Вашем устройстве!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <Provider>
          <Flex direction="column" minH="100vh">
            <Header />
            <Box flexGrow={1}>{children}</Box>
            <Footer />
            <Toaster />
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
