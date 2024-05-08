import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import PropTypes from "prop-types";

function Star({ starClassname }) {
  const starRef = useRef(null);

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
      viewBox="0 0 139 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={starClassname}
      ref={starRef}
    >
      <g filter="url(#filter0_d_157_5087)">
        <path
          d="M41.0624 32.7729C48.333 49.1394 50.7465 56.5846 48.5112 57.9557C46.9466 58.9155 44.4044 59.2847 42.9382 58.399C41.6046 57.7294 37.9524 57.292 34.698 57.5032C29.7046 57.8885 29.9698 58.3208 36.581 64.0836C45.6776 71.8921 44.7759 73.9328 24.5109 89.0411C15.8768 95.5273 8.84902 101.623 8.84147 103.116C8.70131 104.392 17.9 100.832 28.9361 95.2522C51.0084 84.0933 53.9483 84.3725 56.5551 97.6495L58.4306 105.722L61.9046 97.3433C64.0224 92.7715 66.6288 88.495 67.97 87.6724C69.9817 86.4384 91.5658 110.091 98.3286 121.116C100.052 123.927 102.67 126.188 104.186 126.151C105.701 126.114 102.102 115.231 95.7521 101.87C89.6257 88.3721 85.6285 76.8406 86.7462 76.155C88.0873 75.3324 93.2133 75.1633 98.4719 75.2104L108.095 75.853L103.124 71.7616C90.921 61.3959 91.1937 60.3361 111.284 44.4422C121.533 36.0734 130.125 29.0176 130.663 28.3901C131.201 27.7626 121.332 31.7338 109.004 37.2132C96.6756 42.6926 85.7796 46.996 84.7112 46.7588C83.6428 46.5216 81.703 42.3562 80.1685 37.347C78.0278 28.842 77.5391 28.5467 74.9326 32.8232C73.2694 35.6285 72.0041 39.0824 71.9965 40.5746C72.1216 42.283 70.6403 44.3817 69.0756 45.3415C67.0639 46.5755 61.0323 40.7546 50.0035 27.2884C41.1455 16.3583 33.1666 7.86427 32.2725 8.41271C31.3784 8.96115 35.3339 19.9232 41.0624 32.7729Z"
          fill="url(#paint0_linear_157_5087)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_157_5087"
          x="0.839844"
          y="0.387573"
          width="137.844"
          height="133.764"
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
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.886275 0 0 0 0 0.72549 0 0 0 0 0.356863 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_157_5087"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_157_5087"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_157_5087"
          x1="106.104"
          y1="125.018"
          x2="33.9476"
          y2="7.3852"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2B95B" />
          <stop offset="1" stopColor="#DF824D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Star;

Star.propTypes = {
  starClassname: PropTypes.string.isRequired,
};
