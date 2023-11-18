import React from "react";

import Svg, { Circle, Path, SvgProps } from "react-native-svg";

export const SearchIcon = ({ width, height, ...props }: SvgProps) => {
    return (
        <Svg width={width} height={height} {...props} viewBox="0 0 24 24" fill="none">
            <Circle cx="11" cy="11" r="6" stroke="#222222"/>
            <Path d="M20 20L17 17" stroke="#222222" strokeLinecap="round"/>
        </Svg>
    )
}
