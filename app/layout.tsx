import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import './globals.css'
import SupabaseProvider from '@/providers/SupabaseProvider'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/providers/ThemeProvider'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Full stack application',
  description: 'The future is already Here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SupabaseProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange

        >
          <body className={`${inter.className} bg-muted`}>
            <div className='flex flex-col container bg-muted'>
              <Navbar />
              <Toaster />
              {children}
              <Footer />
            </div>
          </body>
        </ThemeProvider>
      </SupabaseProvider>
    </html>
  )
}
