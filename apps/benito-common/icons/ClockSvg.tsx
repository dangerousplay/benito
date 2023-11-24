import Svg, {Path, SvgProps, Circle} from "react-native-svg";

export function ClockIcon(props: SvgProps) {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <Circle cx="12" cy="12" r="8.5" stroke="#222222"/>
            <Path d="M16.5 12H12.25C12.1119 12 12 11.8881 12 11.75V8.5" stroke="#222222" strokeLinecap="round"/>
        </Svg>
    )
}
