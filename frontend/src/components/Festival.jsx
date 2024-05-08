import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../styles/Festival.scss";
import Date from "./Date";
import IvyBranch3 from "./animations/svg/IvyBranch3";

gsap.registerPlugin(ScrollTrigger);

function Festival() {
  const [festivalInfo, setFestivalInfo] = useState();
  const ivyFestRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 550px)", () => {
      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: "#branch1Fest",
          start: "top center",
          end: "bottom center",
          scrub: 20,
          once: true,
        },
      });

      const childrenIvyFest = ivyFestRef.current.querySelectorAll(
        "path:not(.ivyBranch4)"
      );

      tl4
        .fromTo(
          "#branch1Fest",
          {
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
          },
          {
            strokeDashoffset: 0,
            duration: 5,
          }
        )
        .from(childrenIvyFest, {
          transformOrigin: "bottom",
          opacity: 0,
          scale: 0,
          duration: 2,
          stagger: 0.03,
          delay: -4,
        });
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/festivals/`)
      .then((response) => {
        setFestivalInfo(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // console.info(festivalInfo);

  const formatDate = (dateString) => {
    const months = [
      "JANVIER",
      "FÉVRIER",
      "MARS",
      "AVRIL",
      "MAI",
      "JUIN",
      "JUILLET",
      "AOÛT",
      "SEPTEMBRE",
      "OCTOBRE",
      "NOVEMBRE",
      "DÉCEMBRE",
    ];

    const dateParts = dateString.split("T")[0].split("-");
    const year = dateParts[0];
    const month = months[parseInt(dateParts[1], 10)];
    const day = parseInt(dateParts[2], 10);

    return `${day} ${month} ${year}`;
  };

  return (
    <div className="festival">
      <IvyBranch3 BranchID="branch1Fest" IvyRef={ivyFestRef} />
      <div className="festival-container">
        <div className="principal-box">
          <h1>Retrouvez vos sellies et nos Prochains Festivals</h1>
        </div>
        <div className="dates-box">
          {festivalInfo &&
            festivalInfo.map((festival) => (
              <Date
                key={festival.id}
                date={formatDate(festival.date)}
                nom={festival.nom}
                lieu={festival.lieu}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Festival;
