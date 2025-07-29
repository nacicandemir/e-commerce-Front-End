"use client";

import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter()
  const categoryList = [
    { name: "Erkek", categorySlug:"erkek", sub: ["Tişört", "Pantolon", "Ceket"] },
    { name: "Kadın",categorySlug:"kadin", sub: ["Elbise", "Bluz", "Etek"] },
    { name: "Elektronik",categorySlug:"elektronik", sub: ["Telefon", "Laptop", "TV"] },
    { name: "Ev & Yaşam",categorySlug:"ev-yasam", sub: ["Mobilya", "Dekorasyon", "Mutfak"] },
    { name: "Spor Malzemeleri",categorySlug:"spor", sub: ["Top", "Forma", "Ayakkabı"] },
    { name: "Kitap&Müzik",categorySlug:"kitaplar-müzikler", sub: ["Roman", "Klasik", "CD"] },
  ];

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/category/${categorySlug}`)
  }

  return (
    // py-1 ile dikey boşluk azaltıldı
    <div className="flex flex-nowrap md:justify-center gap-x-4 md:gap-x-6 overflow-x-auto py-1 px-2 md:px-0">
      {categoryList.map((ctg, i) => (
        <div
          // py-1 ile kategori item'larının kendi içindeki dikey padding azaltıldı
          // text-sm veya text-xs ile metin boyutu daha da küçültülebilir
          onClick={()=>handleCategoryClick(ctg.categorySlug)}
          className="text-slate-600 hover:text-black transition-colors duration-200 
                     text-center whitespace-nowrap px-2 py-1 cursor-pointer 
                     text-sm font-medium relative group"
          key={i}
        >
          {ctg.name}
          {/* Alt çizgi efekti */}
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </div>
      ))}
    </div>
  );
};

export default Category;
