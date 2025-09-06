import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EcoFinds - Sustainable Second-Hand Marketplace",
  description:
    "Discover unique second-hand items and make sustainable choices with EcoFinds. Buy and sell pre-owned goods in our trusted community marketplace.",
  keywords: "second-hand, marketplace, sustainable, eco-friendly, vintage, pre-owned, circular economy",
  authors: [{ name: "EcoFinds Team" }],
  creator: "EcoFinds",
  publisher: "EcoFinds",
  robots: "index, follow",
  openGraph: {
    title: "EcoFinds - Sustainable Second-Hand Marketplace",
    description: "Discover unique second-hand items and make sustainable choices with EcoFinds.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoFinds - Sustainable Second-Hand Marketplace",
    description: "Discover unique second-hand items and make sustainable choices with EcoFinds.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
