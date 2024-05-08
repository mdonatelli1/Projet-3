import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import PropTypes from "prop-types";

function Star2({ starClassname }) {
  const star2Ref = useRef(null);

  useGSAP(() => {
    gsap.from(`.${starClassname}`, {
      scale: 0.8,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <svg
      width="98"
      height="101"
      viewBox="0 0 98 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={starClassname}
      ref={star2Ref}
    >
      <g filter="url(#filter0_d_157_5914)">
        <path
          d="M76.7537 27.0679C67.4567 40.4216 66.5628 42.354 68.9258 45.4121C70.5655 47.4893 74.5942 49.0765 79.0822 49.0197C87.5516 48.8771 87.1882 51.675 78.4524 53.5772C69.0891 55.6522 68.5078 59.6905 75.6927 70.0185C88.4713 88.0782 88.6157 88.7128 77.4483 80.6628C61.3122 69.0927 58.079 68.8036 54.3095 78.6104L51.3131 86.6865L48.9052 77.5709L46.618 68.2534L40.7531 71.0503C37.4465 72.6362 30.8807 77.4809 26.0043 81.6914C21.3209 86.0174 16.7346 89.3049 16.1557 88.9586C15.5767 88.6123 18.9579 82.9593 23.9563 76.3546C30.0414 67.9329 32.5536 62.8566 32.4589 59.5106C32.0754 54.8952 31.4965 54.549 22.2552 54.2299L12.1935 53.9684L22.0646 49.73C31.3805 45.9819 31.7428 45.3762 30.0321 40.7894C28.9477 38.222 24.6562 31.8175 20.4606 26.5668L12.7928 17.0464L27.8693 24.6933C43.9107 32.9173 43.9107 32.9173 48.3823 18.8704L50.2919 12.6113L51.4449 22.0728C52.2866 27.2363 54.0695 32.1404 55.4203 32.9483C56.7711 33.7562 62.5638 30.642 68.3814 26.1721C74.0782 21.9041 80.7647 16.8574 83.0579 15.2137C85.5926 13.1661 83.3219 17.8386 76.7537 27.0679Z"
          fill="url(#paint0_linear_157_5914)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_157_5914"
          x="0.193359"
          y="0.611328"
          width="97.3711"
          height="100.372"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.886275 0 0 0 0 0.72549 0 0 0 0 0.356863 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_157_5914"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_157_5914"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_157_5914"
          x1="23.8557"
          y1="93.5641"
          x2="74.414"
          y2="9.03454"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DF824D" />
          <stop offset="1" stopColor="#E2B95B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Star2;

Star2.propTypes = {
  starClassname: PropTypes.string.isRequired,
};
