import heroImage from "@/shared/assets/images/HeroImage4k.png"
import altaVista from "@/shared/assets/images/AltaVista.png"
import noahGardenSideCorridor from "@/shared/assets/images/NoahGardenSideCorridor.png"
import noahGarden from "@/shared/assets/images/NoahGarden.png"
import noahBeach from "@/shared/assets/images/NoahBeach.png"
import { PropertyCard } from "../PropertyCard";

export default function PortifolioSection() {
    
    const properties = [
        { img: heroImage, title: "Casa Bella Vita", location: "Cascavel, PR" },
        { img: altaVista, title: "Sobrado Alta Vista", location: "Cascavel, PR" },
        { img: noahGardenSideCorridor, title: "Sobrado Noah Garden", location: "Cascavel, PR" },
        { img: noahGarden, title: "Sobrado Noah Garden", location: "Cascavel, PR" },
        { img: noahBeach, title: "Sobrado Noah Beach", location: "Cascavel, PR" },
    ];

    return (
        <section id="portfolio" className=" bg-[#F7F3F1] py-12">
            <div className=" container flex flex-col gap-2">
                <h3 className="font-family-primary text-h2 font-bold">Destaques do Portifólio</h3>
                <p className="font-family-primary text-body text-[#474741]">Nossa contruções mais emblemáticas</p>
                <div className="flex overflow-x-auto gap-4 snap-x pt-6  no-scrollbar">
                    {properties.map((property, index) => (
                        <div key={index} className={`shrink-0  snap-start w-[80%] md:w-[30%]`}>
                            <PropertyCard img={property.img} title={property.title} location={property.location} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}