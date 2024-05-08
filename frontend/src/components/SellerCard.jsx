import PropTypes from "prop-types";
import "../styles/SellerCard.scss";

function SellerCard({ seller, isSelected, onSelect, alternate }) {
  const sellerCardStyle = {
    borderColor: seller.color,
    backgroundColor: isSelected ? seller.color : "transparent",
    borderWidth: "1.5px",
  };
  if (isSelected) {
    sellerCardStyle.boxShadow = `0 0px 25px ${seller.color}`;
  }

  const sellerContainerClass = alternate
    ? "sellerCardContainerAlternate"
    : "sellerCardContainer";

  return (
    <div
      className={sellerContainerClass}
      onClick={() => onSelect(seller.name)}
      onKeyDown={(e) => {
        // si utilisateur appuie sur Entrée ou Espaceca va déclencher le onSelect
        if (e.key === "Enter" || e.key === " ") {
          onSelect(seller.name);
        }
      }}
      style={{
        ...sellerCardStyle,
        boxShadow: `0 0 4px ${seller.color}`,
      }}
      // on ajout tabIndex pour rendre l'élément focusable via le clavier
      tabIndex="0"
      role="button"
      aria-pressed={isSelected ? "true" : "false"}
    >
      <div className="sellerCard" style={sellerCardStyle}>
        <div
          className="bkgdSellerCard"
          style={{
            borderColor: seller.color,
            borderWidth: "1.5px",
            borderStyle: "solid",
            boxShadow: `0 0 4px ${seller.color}`,
          }}
        >
          <img
            src={`src/assets/${seller.image}`}
            alt={seller.name}
            className="sellerCardImage"
          />
        </div>
      </div>
      <div
        className="sellerCardName"
        style={{
          boxShadow: `0 0 4px ${seller.color}`,
        }}
      >
        {seller.name}
      </div>
    </div>
  );
}

SellerCard.propTypes = {
  seller: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  alternate: PropTypes.bool,
};

SellerCard.defaultProps = {
  alternate: false,
};

export default SellerCard;
