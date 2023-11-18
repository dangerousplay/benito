import React from "react";
import Svg, { Ellipse, Path, SvgProps } from "react-native-svg";

export const FilterIcon = ({ width = "31", height = "31", ...props }: SvgProps) => {
    return (
        <Svg width={width} height={height} {...props} viewBox="0 0 31 30" fill="none">
            <Path d="M6.75 15L6.75 4.66667" stroke="#222222" strokeLinecap="round"/>
            <Path d="M24.25 25.3335L24.25 21.4585" stroke="#222222" strokeLinecap="round"/>
            <Path d="M6.75 25.3335L6.75 20.1668" stroke="#222222" strokeLinecap="round"/>
            <Path d="M24.25 16.2915L24.25 4.6665" stroke="#222222" strokeLinecap="round"/>
            <Path d="M15.5 8.5415L15.5 4.6665" stroke="#222222" strokeLinecap="round"/>
            <Path d="M15.5 25.3335L15.5 13.7085" stroke="#222222" strokeLinecap="round"/>
            <Ellipse cx="6.75" cy="17.5833" rx="2.5" ry="2.58333" stroke="#222222" strokeLinecap="round"/>
            <Ellipse cx="15.5" cy="11.1248" rx="2.5" ry="2.58333" stroke="#222222" strokeLinecap="round"/>
            <Ellipse cx="24.25" cy="18.8748" rx="2.5" ry="2.58333" stroke="#222222" strokeLinecap="round"/>
        </Svg>
    )
}
