"use client"
import * as React from "react";
import { useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import MainCarouselItem from "./main-carousel-item";
import { Input } from "./ui/input"

const MainCarousel = ({ combinedData }) => {
    const [hoveredImageSrc, setHoveredImageSrc] = useState(null);
    const [searchValue, setSearchValue] = useState("")
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
    const filteredItem = combinedData.filter((item) => {
        return item.volumeInfo.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    return (
        <>
            <Input
                className="w-11/12 px-3 py-5  md:max-w-4xl md:py-6 md:px-4 focus-visible:ring-1 search-box"
                type="text"
                id="search"
                placeholder="Discover Hidden Stories on Screen"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Carousel
                plugins={[plugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full md:max-w-6xl md:mt-3 mt-0 mb-0"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="md:m-8 md:mt-4 px-3 mx-auto my-8 mt-4">
                    {filteredItem.length > 0 ? filteredItem.map((item) => (
                        <MainCarouselItem
                            key={item.id}
                            item={item}
                            setHoveredImageSrc={setHoveredImageSrc}
                            hoveredImageSrc={hoveredImageSrc}
                        />
                    )) : combinedData.map((item) => (
                        <MainCarouselItem
                            key={item.id}
                            item={item}
                            setHoveredImageSrc={setHoveredImageSrc}
                            hoveredImageSrc={hoveredImageSrc}
                        />
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:block" />
                <CarouselNext className="hidden lg:block" />
            </Carousel>

        </>
    );
};

export default MainCarousel;
