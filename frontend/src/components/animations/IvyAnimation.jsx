import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import PropTypes from "prop-types";

gsap.registerPlugin(ScrollTrigger);

function IvyAnimation({ children, ivyId, ivyRef, start, end }) {
  useGSAP(() => {
    if (!ivyRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ivyRef.current,
        start: `${start}`,
        end: `${end}`,
        scrub: 10,
        once: true,
      },
    });

    const childrenIvy1 = Array.from(ivyRef.current.children[0].children).filter(
      (child) => !child.classList.contains("ivyBranch")
    );

    tl.fromTo(
      ".ivyBranch",
      {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
      },
      {
        strokeDashoffset: 0,
        duration: 10,
      }
    ).from(childrenIvy1, {
      transformOrigin: "bottom",
      opacity: 0,
      scale: 0,
      duration: 2,
      stagger: 0.03,
      delay: -8,
    });

    const childrenIvy2 = Array.from(ivyRef.current.children[1].children).filter(
      (child) => !child.classList.contains("ivyBranch2")
    );

    tl.fromTo(
      ".ivyBranch2",
      {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
      },
      {
        strokeDashoffset: 0,
        duration: 10,
      }
    ).from(childrenIvy2, {
      transformOrigin: "bottom",
      opacity: 0,
      scale: 0,
      duration: 2,
      stagger: 0.03,
      delay: -8,
    });
  }, []);

  return (
    <div ref={ivyRef} id={ivyId}>
      {children}
    </div>
  );
}

IvyAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  ivyId: PropTypes.string.isRequired,
  ivyRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

export default IvyAnimation;
