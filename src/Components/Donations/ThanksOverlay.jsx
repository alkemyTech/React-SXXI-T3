const ThanksOverlay = ({ show, handleClose }) => {
  return (
    <>
      {show && (
        <div className={`donation_overlay`} onClick={handleClose}>
          <div className="donation_text">Muchas gracias! 💓</div>
        </div>
      )}
    </>
  );
};

export default ThanksOverlay;
