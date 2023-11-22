import {InputProps} from "@nextui-org/input/dist/input";
import {Input} from "@nextui-org/react";
import {MaskProps, useMask} from "@react-input/mask";
import MaskedInput from 'react-text-mask'

type InputMaskedProps = {
    parseValue?: (v: unknown) => any
} & MaskProps & InputProps;

export const InputMasked = ({parseValue, onChange, ...props}: InputMaskedProps) => {
    const inputRef = useMask(props);

    const onChangeWithParser = parseValue ? (v) => {
        v.target.value = parseValue(v.target.value)
        onChange(v)
    } : onChange;

    return <Input {...props} onChange={onChangeWithParser} ref={inputRef} />
}


type MaskedInputProps = {
    parseValue?: (v: unknown) => any
} & MaskedInputProps & InputProps;

export const MaskedaInput = ({parseValue, onChange, ...props}: MaskedInputProps) => {
    const inputRef = useMask(props);

    return (
        <MaskedInput
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholder="Enter a phone number"
            id="my-input-id"
            {...props}
            render={(ref, props) => (
                <Input ref={ref} {...props} />
            )}
        />
    )
}

