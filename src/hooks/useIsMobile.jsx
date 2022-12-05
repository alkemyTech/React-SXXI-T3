import {useEffect, useState} from "react";

export const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateDevice = () => {
            setIsMobile(window.innerWidth < 768);
        };
        updateDevice();
        window.addEventListener("resize", updateDevice);

        return () => {
            window.removeEventListener("resize", updateDevice);
        };
    }, []);

    return isMobile;
}