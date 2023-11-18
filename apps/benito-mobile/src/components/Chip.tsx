import {SText} from "@/components/core";


type ChipProps = {
    className?: string;
    text: string;
    color?: string;
};

const Chip = ({className = "", text, color = 'blue-600'}: ChipProps) => {
    return (
        <SText className={`rounded-2xl text-white px-2 py-1 bg-${color} ${className}`}>
            {text}
        </SText>
    )
};

export default Chip;
