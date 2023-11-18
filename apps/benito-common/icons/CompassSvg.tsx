import Svg, { Circle, Path, SvgProps } from "react-native-svg";

export function CompassIcon(props: SvgProps) {
    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
            <Circle cx="10.9999" cy="11.0002" r="8.66667" stroke="#222222"/>
            <Circle cx="11.0001" cy="10.9998" r="6.83333" stroke="#222222"/>
            <Path d="M4.125 11H5.95833" stroke="#222222" strokeLinecap="round"/>
            <Path d="M16.0417 11H17.8751" stroke="#222222" strokeLinecap="round"/>
            <Path d="M11 4.125V5.95833" stroke="#222222" strokeLinecap="round"/>
            <Path d="M11 16.0415V17.8748" stroke="#222222" strokeLinecap="round"/>
            <Path
                d="M7.83508 7.89983L9.61712 12.3549C9.62221 12.3676 9.63227 12.3777 9.64498 12.3828L14.1001 14.1648C14.1409 14.1812 14.1814 14.1407 14.1651 14.0998L12.383 9.64473C12.378 9.63203 12.3679 9.62196 12.3552 9.61688L7.90007 7.83483C7.85925 7.81851 7.81875 7.85901 7.83508 7.89983Z"
                stroke="#222222" strokeLinecap="round"/>
            <Path d="M11.9166 10.0835L10.0833 11.9168" stroke="#222222" strokeLinecap="round"/>
        </Svg>
    )
}
