import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SellerCard from "./SellerCard";
import sellersData from "../../sellerData.json";
import "../styles/Sellers.scss";
import Mist from "./animations/svg/Mist";
import IvyBranch2 from "./animations/svg/IvyBranch2";

gsap.registerPlugin(ScrollTrigger);

// eslint-disable-next-line react/prop-types
function Sellers({ onSellerSelect }) {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const ivySellersRef1 = useRef(null);
  const ivySellersRef2 = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 550px)", () => {
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: "#sellers",
          start: "top center",
          end: "bottom bottom",
          scrub: 20,
          once: true,
        },
      });

      const childrenIvySellers1 = ivySellersRef1.current.querySelectorAll(
        "path:not(.ivyBranch3)"
      );
      const childrenIvySellers2 = ivySellersRef2.current.querySelectorAll(
        "path:not(.ivyBranch3)"
      );

      tl3
        .from(".sellerCardContainer", {
          opacity: 0,
          duration: 8,
          y: -500,
          stagger: {
            each: 2,
          },
          ease: "elastic.out(1,0.7)",
        })
        .fromTo(
          ["#branch1Sellers", "#branch2Sellers"],
          {
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
          },
          {
            strokeDashoffset: 0,
            duration: 15,
            delay: -1,
          }
        )
        .from([childrenIvySellers1, childrenIvySellers2], {
          transformOrigin: "bottom",
          opacity: 0,
          scale: 0,
          duration: 2,
          stagger: 0.03,
          delay: -3,
        });
    });
  }, []);

  return (
    <div id="sellers">
      <Mist />
      <IvyBranch2 BranchID="branch1Sellers" IvyRef={ivySellersRef1} />
      <IvyBranch2 BranchID="branch2Sellers" IvyRef={ivySellersRef2} />
      <div className="sellersContainer">
        {sellersData.map((seller) => {
          const isSelected = seller.name === selectedSeller;
          return (
            <SellerCard
              key={seller.name}
              seller={seller}
              isSelected={isSelected}
              onSelect={() => {
                setSelectedSeller(seller.name);
                if (typeof onSellerSelect === "function") {
                  onSellerSelect(seller.name);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sellers;
