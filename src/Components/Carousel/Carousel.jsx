import { useEffect, useState } from "react";

import Button from "../Button/Button";

import styles from "./Carousel.module.css";

const Carousel = ({
  itemList = [],
  ItemTemplate,
  itemKey,
  autoplay = true,
  className,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const listLength = itemList.length;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        nextItem();
      }, 5000);
      return () => clearInterval(interval);
    }
  });

  const nextItem = () => {
    setActiveItemIndex((activeItemIndex) => (activeItemIndex + 1) % listLength);
  };

  const prevItem = () => {
    setActiveItemIndex((activeItemIndex) =>
      activeItemIndex === 0 ? listLength - 1 : activeItemIndex - 1
    );
  };

  if (itemList.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div className={styles.itemsContainer}>
        {itemList.map((item, index) => {
          const isActive = index === activeItemIndex;
          return (
            <CarrouselItem
              item={item}
              key={item[itemKey] || index}
              isActive={isActive}
              ItemTemplate={ItemTemplate}
            />
          );
        })}
      </div>
      <Button
        className={`${styles.carouselButton} ${styles.left}`}
        onClick={prevItem}
        variant="text"
        label="◀"
      />
      <Button
        className={`${styles.carouselButton} ${styles.right}`}
        onClick={nextItem}
        variant="text"
        label="▶"
      />
    </div>
  );
};
export default Carousel;

const CarrouselItem = ({ isActive, ItemTemplate, item }) => {
  return (
    <div className={`${styles.item} ${isActive ? styles.active : ""}`}>
      <div className={styles.itemWrapper}>
        <ItemTemplate {...item} />
      </div>
    </div>
  );
};
