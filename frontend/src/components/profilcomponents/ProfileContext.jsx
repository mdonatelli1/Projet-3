import React, { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

function ProfileProvider({ children }) {
  const [sectionActive, setSectionActive] = useState("MesInformations");
  const [subSectionActive, setSubSectionActive] = useState("infos");

  const switchSection = (newSection) => {
    setSectionActive(newSection);
  };

  const switchSubSection = (newSubSection) => {
    setSubSectionActive(newSubSection);
  };

  const value = useMemo(
    () => ({
      sectionActive,
      switchSection,
      subSectionActive,
      switchSubSection,
    }),
    [sectionActive, subSectionActive]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProfileProvider };
