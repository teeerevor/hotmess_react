export const fromStyleMap = (styleMap) =>
    (props) => {
        const style = Object.keys(styleMap).reduce((acc, val) => {
            if (props[val] && val !== 'default') {
                acc.push(styleMap[val]);
            }

            return acc;
        }, [styleMap.default]);

        return style;
    };
