import {InputProps} from "@nextui-org/input/dist/input";
import {Input} from "@nextui-org/react";
import {MaskProps, useMask} from "@react-input/mask";

type InputMaskedProps = MaskProps & InputProps;

export const InputMasked = ({...props}: InputMaskedProps) => {
    const inputRef = useMask(props);

    return <Input {...props} ref={inputRef} />
}
