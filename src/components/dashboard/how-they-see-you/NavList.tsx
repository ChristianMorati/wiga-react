import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const navItems = [
    { label: "Lojas", href: "/" },
    { label: "Produtos", href: "/produtos" },
    { label: "Promoções", href: "/categorias" },
    { label: "Promoções", href: "/categorias" },
    { label: "Promoções", href: "/categorias" },
    { label: "Promoções", href: "/categorias" },
];
export default function NavList() {
    return (
        <>
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={5}
                slidesPerView={4}
                className="w-screen h-full flex"
            >
                {navItems.map((item, index) => (
                    <SwiperSlide key={index} className="text-center border border-slate-400">
                        <p
                            className="w-auto p-2 text-sm"
                        >
                            {item.label}
                        </p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

