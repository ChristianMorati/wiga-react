import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import SectionTitle from "../../SectionTitle";

const banners = [
	'https://shoppingmueller.com.br/wp-content/uploads/2021/11/Vivo-Agosto-02.jpg',
	'https://images.adsttc.com/media/images/5dae/6ee3/3312/fd2d/bb00/00ed/newsletter/FEATURED_IMAGE.jpg?1571712731',
];

const mockProducts = [
	{ id: 1, name: "Produto A", price: "R$ 99,99", image: "https://mercantilnovaera.vtexassets.com/arquivos/ids/199040/Detergente-Liquido-YPE-Clear-Frasco-500ml.jpg?v=637915923218700000" },
	{ id: 2, name: "Playstation 5 Pro", price: "R$ 149,99", image: "https://webfones.vtexassets.com/arquivos/ids/244215-800-800?v=638621938387330000&width=800&height=800&aspect=true" },
	{ id: 3, name: "Produto B", price: "R$ 79,99", image: "https://mercantilnovaera.vtexassets.com/arquivos/ids/199041/Detergente-Liquido-YPE-Clear-Frasco-500ml.jpg?v=637915923218700000" },
	{ id: 4, name: "Xbox Series X", price: "R$ 199,99", image: "https://webfones.vtexassets.com/arquivos/ids/244216-800-800?v=638621938387330000&width=800&height=800&aspect=true" },
	{ id: 5, name: "Fone de Ouvido", price: "R$ 49,99", image: "https://mercantilnovaera.vtexassets.com/arquivos/ids/199042/Detergente-Liquido-YPE-Clear-Frasco-500ml.jpg?v=637915923218700000" },
	{ id: 6, name: "Fone de Ouvido", price: "R$ 49,99", image: "https://mercantilnovaera.vtexassets.com/arquivos/ids/199042/Detergente-Liquido-YPE-Clear-Frasco-500ml.jpg?v=637915923218700000" },
];

function EcommerceDisplay() {
	const [products, setProducts] = useState(mockProducts);
	const [loading, setLoading] = useState(false);

	function getMoreProducts() {
		if (loading) return;

		setLoading(true);
		setTimeout(() => {
			const newProducts = mockProducts.map((p) => ({ ...p, id: p.id + products.length }));
			setProducts((prev) => [...prev, ...newProducts]);
			setLoading(false);
		}, 1500);
	}

	return (
		<>
			<div className="flex flex-col overflow-hidden gap-2 w-full lg:justify-center lg:items-center">
				<div className="relative w-full mx-auto">
					<Swiper
						modules={[Autoplay, Pagination]}
						spaceBetween={50}
						slidesPerView={1}
						autoplay={{ delay: 3000 }}
						pagination={{ clickable: true }}
						centeredSlides
					>
						{banners.map((banner, index) => (
							<SwiperSlide key={index}>
								<img src={banner} alt={`Banner ${index + 1}`} className="w-full h-[300px] object-cover shadow-md" />
							</SwiperSlide>
						))}
					</Swiper>
					{loading && (
						<div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
							<div className="bg-white p-4 shadow-lg flex items-center gap-2">
								<Loader2 className="animate-spin text-blue-600" size={24} />
								<span className="text-gray-800">Carregando...</span>
							</div>
						</div>
					)}
				</div>
				<div>
					<SectionTitle title="Produtos em Destaque" />
				</div>
				<div className="relative w-full mx-auto">
					<Swiper
						slidesPerView={2}
						modules={[Navigation]}
						pagination={{ clickable: true }}
						navigation
						breakpoints={{
							230: { slidesPerView: 3 },
							768: { slidesPerView: 5 },
							1024: { slidesPerView: 6 },
							1280: { slidesPerView: 5 },
						}}
						onSlideChange={({ activeIndex }) => {
							if (activeIndex >= products.length - 3) {
								getMoreProducts();
							}
						}}
					>
						{products.map((item) => (
							<SwiperSlide key={item.id} className="rounded-lg max-h-[300px]">
								<ProductCard item={item} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div>
					<SectionTitle title="Produtos em Destaque" />
				</div>
				<div className="relative w-full mx-auto">
					<Swiper
						slidesPerView={2}
						modules={[Navigation]}
						pagination={{ clickable: true }}
						navigation
						breakpoints={{
							230: { slidesPerView: 3 },
							768: { slidesPerView: 5 },
							1024: { slidesPerView: 6 },
							1280: { slidesPerView: 5 },
						}}
						onSlideChange={({ activeIndex }) => {
							if (activeIndex >= products.length - 3) {
								getMoreProducts();
							}
						}}
					>
						{products.map((item) => (
							<SwiperSlide key={item.id} className="rounded-lg max-h-[300px]">
								<ProductCard item={item} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</>
	);
}

export default EcommerceDisplay;