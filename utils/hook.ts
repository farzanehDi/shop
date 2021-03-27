import { useState, useEffect } from 'react';

export const useViewPort = () => {

    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(document.body.clientWidth);
        const handleWindowResize = () => {
            setWidth(document.body.clientWidth);
        }

        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);

    return { width };
}