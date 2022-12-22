import {useEffect, useState} from "react";

export const useMinWindowSize = (size) => {
    const [isMinSize, setIsMinSize] = useState(false);

    useEffect(() => {
        const updateDevice = () => {
            setIsMinSize(window.innerWidth < size);
        };
        updateDevice();
        window.addEventListener("resize", updateDevice);

        return () => {
            window.removeEventListener("resize", updateDevice);
        };
    }, [size]);
    return isMinSize;
}