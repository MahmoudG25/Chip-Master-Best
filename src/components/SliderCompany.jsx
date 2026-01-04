import apple from "../assets/brands/apple.svg";
import samsung from "../assets/brands/samsung.svg";
import xiaomi from "../assets/brands/xiaomi.svg";
import huawei from "../assets/brands/huawei.svg";
import oppo from "../assets/brands/oppo.svg";
import vivo from "../assets/brands/vivo.svg";
import oneplus from "../assets/brands/oneplus.svg";
import sony from "../assets/brands/sony.svg";
import nokia from "../assets/brands/nokia.svg";

const SliderCompany = () => {
  const brands = [
    { name: "Apple", logo: apple },
    { name: "Samsung", logo: samsung },
    { name: "Xiaomi", logo: xiaomi },
    { name: "Huawei", logo: huawei },
    { name: "Oppo", logo: oppo },
    { name: "Vivo", logo: vivo },
    { name: "OnePlus", logo: oneplus },
    { name: "Sony", logo: sony },
    { name: "Nokia", logo: nokia },
  ];

  return (
    <>
      <style>{`
        .marquee {
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 12s linear infinite;
        }

        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="marquee w-[80%] mx-auto mt-14 mb-14 relative select-none">
        {/* fade left */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />

        <div className="marquee-track gap-16 items-center">
          {[...brands, ...brands].map((brand, index) => (
            <img
              key={index}
              src={brand.logo}
              alt={brand.name}
              className="h-10 md:h-12 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              draggable={false}
            />
          ))}
        </div>

        {/* fade right */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </>
  );
};

export default SliderCompany;
