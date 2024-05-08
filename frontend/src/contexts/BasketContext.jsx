import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const BasketContext = createContext();

export const useBasketContext = () => {
  return useContext(BasketContext);
};

export function BasketProvider({ children }) {
  const [isBasketClear, setIsBasketClear] = useState(false);

  const contextValue = useMemo(
    () => ({
      isBasketClear,
      setIsBasketClear,
    }),
    [isBasketClear]
  );

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
}

BasketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasketProvider;
