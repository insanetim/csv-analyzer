import Container from "@/components/Container"
import Header from "@/components/Header"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "CSV Analyzer",
  description: "application for analyzing csv files",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/analyze.png"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <Container className="py-4">{children}</Container>
      </body>
    </html>
  )
}
