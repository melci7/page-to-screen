import Image from "next/image"
import MainCarousel from "../components/main-carousel"
import { fetchBookData, fetchMovieData } from "../components/server-side"

async function getCombinedData() {
  const apiKey = process.env.BOOK_API_KEY
  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.MOVIE_API_KEY,
      accept: "application/json",
    },
  }

  try {
    const [bookInfo, movieInfo] = await Promise.all([
      fetchBookData(apiKey),
      fetchMovieData(options),
    ])

    const combinedData = bookInfo
      .map((book) => {
        const matchingMovie = movieInfo.find(
          (movie) =>
            movie.original_title.toLowerCase() ===
            book.volumeInfo.title.toLowerCase()
        )
        return matchingMovie ? { ...book, movie: matchingMovie } : book
      })
      .sort(() => Math.random() - 0.5)

    return combinedData
  } catch (error) {
    throw new Error(error.message)
  }
}

export default async function Home() {
  const combinedData = await getCombinedData()

  return (
    <section className="h-screen">
      <div className="relative w-full bg-image">
        <Image
          src="/bg-image-2.jpeg"
          className="w-full md:max-h-96 h-80 object-cover"
          alt="Background Image"
          width={1900}
          height={300}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h1 className="text-center text-4xl font-medium text-white max-w-sm px-4 md:max-w-3xl md:text-6xl">
            From Page to Screen Discovering Adaptations
          </h1>
        </div>
      </div>
      <div className="flex flex-col m-auto items-center text-center max-w-7xl md:py-8 py-8 pb-0">
        <MainCarousel combinedData={combinedData} />
      </div>
    </section>
  )
}
