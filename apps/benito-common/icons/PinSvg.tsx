import Svg, { Circle, Path, SvgProps } from "react-native-svg";

export function PinIcon(props: SvgProps) {
    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
            <Path
                d="M17.7477 15.5835C18.4316 16.0015 18.7916 16.4758 18.7916 16.9585C18.7916 17.4412 18.4316 17.9154 17.7477 18.3335C17.0638 18.7515 16.0802 19.0987 14.8958 19.3401C13.7113 19.5814 12.3676 19.7085 10.9999 19.7085C9.6322 19.7085 8.28857 19.5814 7.10409 19.3401C5.9196 19.0987 4.936 18.7515 4.25214 18.3335C3.56828 17.9154 3.20825 17.4412 3.20825 16.9585C3.20825 16.4758 3.56828 16.0015 4.25214 15.5835"
                stroke="#222222" strokeLinecap="round"/>
            <Path
                d="M17.875 9.1665C17.875 13.7281 12.9273 16.8173 11.4265 17.6494C11.1588 17.7978 10.8412 17.7978 10.5735 17.6494C9.07272 16.8173 4.125 13.7281 4.125 9.1665C4.125 5.0415 7.45617 2.2915 11 2.2915C14.6667 2.2915 17.875 5.0415 17.875 9.1665Z"
                stroke="#222222"/>
            <Circle cx="10.9999" cy="9.16667" r="3.16667" stroke="#222222"/>
        </Svg>)
}