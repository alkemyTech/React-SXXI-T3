import "./styles.css";

const Thanks = ({ message = "Muchas gracias! 💓" }) => {
  return (
    <div className="donation_overlay">
      <div className="donation_text">{message}</div>
    </div>
  );
};

export default Thanks;
