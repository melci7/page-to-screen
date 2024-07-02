import * as React from "react";
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card";
import {
    CarouselItem
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"
import styles from "../styles/styles.module.css"

export default function MainCarouselItem({ item, setHoveredImageSrc, hoveredImageSrc }) {
    const [selectedCountry, setSelectedCountry] = useState("")
    const [isClicked, setIsClicked] = useState(true)
    const [provider, setProvider] = useState("")
    function handleClick() {
        setIsClicked(prevValue => !prevValue)
    }

    useEffect(() => {
        if (item?.movie?.providers) {
            setProvider(item.movie.providers[selectedCountry.toUpperCase()] || "");
        }
    }, [selectedCountry]);
    return (

        <Dialog>
            <DialogTrigger asChild>
                <CarouselItem className="lg:basis-1/4 md:basis-3/7 basis-1/1 md:pl-3 md:mr-4 py-2 px-0 carousel-item cursor-pointer">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "tween", stiffness: 300, delay: 0.05 }}
                        whileTap={{ scale: .98 }}
                        className="md:p-0 p-3"
                    >
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-0">
                                <img
                                    src={hoveredImageSrc === item.movie?.moviePoster ? item.movie?.moviePoster : item.bookCover}
                                    alt="Cover of Books or Movie"
                                    className={`w-[252px] h-96 md:w-full md:h-96 rounded-r-lg ${hoveredImageSrc === item.movie?.moviePoster && 'rounded-l-lg'}`}
                                    onMouseEnter={() => setHoveredImageSrc(item.movie?.moviePoster)}
                                    onMouseLeave={() => setHoveredImageSrc(null)}
                                />
                            </CardContent>
                        </Card>
                    </motion.div>
                </CarouselItem>
            </DialogTrigger>
            <DialogContent className="rounded-lg overflow-scroll md:overflow-hidden md:h-auto max-h-fit h-[600px] w-11/12 flex md:flex-row flex-col md:items-start items-center py-8 px-6 md:max-w-5xl gap-5">
                <div className="flex flex-col gap-4">
                    <div
                        className="relative"
                        onMouseEnter={() => setHoveredImageSrc(true)}
                        onMouseLeave={() => setHoveredImageSrc(false)}
                    >
                        <img
                            src={isClicked ? item?.movie?.moviePoster : item?.bookCover}
                            alt={item?.volumeInfo?.title || "Unknown"}
                            className={`min-w-64 max-w-64 h-96 transition-all duration-300 rounded-lg ${!isClicked && "rounded-l-none"} ${hoveredImageSrc ? ' opacity-75' : ''}`}

                        />

                        <Button onClick={handleClick} className={`self-center m-auto px-8 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 ease-in-out ${hoveredImageSrc && "opacity-100"}`}>{isClicked ? "Book" : "Movie"}</Button>

                    </div>
                    {isClicked && provider.flatrate ?
                        <div className="flex gap-3 flex-col">
                            <p className="-mt-1 font-medium border-b-black text-center self-center pb-0 uppercase text-sm tracking-wide">Watch Now</p>
                            <div className="flex flex-wrap gap-2">
                                {provider.flatrate.map((items, index) => (
                                    <a key={index} href={provider.link} target="_blank" title={`Watch ${item.volumeInfo?.title} on ${items.provider_name}`}>
                                        <img src={`https://media.themoviedb.org/t/p/original${items.logo_path}`} alt="Watch" className="object-cover w-12 rounded-md cursor-pointer" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        : isClicked && selectedCountry && <p className="text-sm max-w-72" >There are no offers for {item?.volumeInfo?.title}</p>}

                </div>
                <div className='flex flex-col md:gap-4 gap-2 self-start items-center md:items-start'>
                    <h1 className="md:text-4xl text-3xl">{item?.volumeInfo?.title}</h1>
                    <span className='md:text-xl text-lg'>{isClicked ? item?.movie?.director : item?.volumeInfo?.authors}</span>
                    <p className='md:max-w-3xl leading-relaxed max-w-lg'>{item?.movie?.overview}</p>
                    <p className=''>{isClicked ? item?.movie?.runTime + " minutes" : item?.volumeInfo?.pageCount + " pages"} </p>

                    <div className="flex md:flex-row flex-col items-center md:mt-3 mt-1 gap-5">
                        <div className="flex md:flex-col md:gap-1 gap-3">
                            <p className='font-medium'>This {isClicked ? "movie" : "edition"}</p>
                            <div className='flex md:gap-10 gap-5 items-center tracking-wide'>
                                <p className='text-sm'>{isClicked ? "Released" : "Published"}</p>
                                <p className='text-sm'>{isClicked ? item?.movie?.release_date : item?.volumeInfo?.publishedDate + " by " + item?.volumeInfo?.publisher}</p>
                            </div>
                        </div>
                        {isClicked && <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                            <SelectTrigger className="md:w-[280px] w-[200px]">
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ar">Argentina</SelectItem>
                                <SelectItem value="au">Australia</SelectItem>
                                <SelectItem value="be">Belgium</SelectItem>
                                <SelectItem value="br">Brazil</SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="cl">Chile</SelectItem>
                                <SelectItem value="cn">China</SelectItem>
                                <SelectItem value="co">Colombia</SelectItem>
                                <SelectItem value="cu">Cuba</SelectItem>
                                <SelectItem value="de">Germany</SelectItem>
                                <SelectItem value="ec">Ecuador</SelectItem>
                                <SelectItem value="eg">Egypt</SelectItem>
                                <SelectItem value="es">Spain</SelectItem>
                                <SelectItem value="et">Ethiopia</SelectItem>
                                <SelectItem value="fj">Fiji</SelectItem>
                                <SelectItem value="fr">France</SelectItem>
                                <SelectItem value="gb">United Kingdom</SelectItem>
                                <SelectItem value="ht">Haiti</SelectItem>
                                <SelectItem value="id">Indonesia</SelectItem>
                                <SelectItem value="in">India</SelectItem>
                                <SelectItem value="it">Italy</SelectItem>
                                <SelectItem value="jm">Jamaica</SelectItem>
                                <SelectItem value="jp">Japan</SelectItem>
                                <SelectItem value="ke">Kenya</SelectItem>
                                <SelectItem value="kr">South Korea</SelectItem>
                                <SelectItem value="ma">Morocco</SelectItem>
                                <SelectItem value="mx">Mexico</SelectItem>
                                <SelectItem value="ng">Nigeria</SelectItem>
                                <SelectItem value="nl">Netherlands</SelectItem>
                                <SelectItem value="nr">Nauru</SelectItem>
                                <SelectItem value="nz">New Zealand</SelectItem>
                                <SelectItem value="pe">Peru</SelectItem>
                                <SelectItem value="ph">Philippines</SelectItem>
                                <SelectItem value="pl">Poland</SelectItem>
                                <SelectItem value="pg">Papua New Guinea</SelectItem>
                                <SelectItem value="ru">Russia</SelectItem>
                                <SelectItem value="za">South Africa</SelectItem>
                                <SelectItem value="th">Thailand</SelectItem>
                                <SelectItem value="tr">Turkey</SelectItem>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="ve">Venezuela</SelectItem>
                                <SelectItem value="vn">Vietnam</SelectItem>
                                <SelectItem value="ch">Switzerland</SelectItem>
                            </SelectContent>
                        </Select>}
                    </div>





                </div>
            </DialogContent>
        </Dialog>

    )
}