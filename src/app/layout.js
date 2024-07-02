import { Inter } from "next/font/google"
import "../styles/globals.css"

export const metadata = {
  title: "Page to Screen",
  description:
    "Uncover the magic of movie adaptations from books. Find in-depth movie details and find out where to watch movies online in your country",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
