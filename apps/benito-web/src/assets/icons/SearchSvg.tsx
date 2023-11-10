import React from "react";


type SvgProps = React.SVGProps<any>;

export const SearchIcon = ({ width, height, ...props }: SvgProps) => {
    return (
        <svg width={width} height={height} {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="6" stroke="#222222"/>
            <path d="M20 20L17 17" stroke="#222222" strokeLinecap="round"/>
        </svg>
    )
}
