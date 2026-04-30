import Image from "next/image"
import Link from "next/link"
import Container from "./Container"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <Container>
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-gray-900 hover:text-gray-700"
          >
            <Image
              src="/analyze.png"
              alt="CSV Analyzer"
              width={40}
              height={40}
            />
            CSV Analyzer
          </Link>
        </div>
      </Container>
    </header>
  )
}

export default Header
