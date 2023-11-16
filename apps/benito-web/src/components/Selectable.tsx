import {Select, SelectionMode, SelectItem} from "@nextui-org/react";


export type SelectItem = {
    id: string;
    name: string;
}

export type SelectableProps = {
    label: string;
    placeHolder: string;
    selectionMode: SelectionMode;
    items: SelectItem[];
    onSelectionChange?: (_: string[]) => void;
}

export const Selectable = ({
                        label,
                        placeHolder,
                        items,
                        selectionMode,
                        onSelectionChange = (_) => {}
                     }: SelectableProps) => {
    return (
        <Select
            label={label}
            placeholder={placeHolder}
            selectionMode={selectionMode}
            className="max-w-full"
            onSelectionChange={e => {
                const selectedItems: string[] = []

                e.forEach(i => {
                    selectedItems.push(i)
                })

                onSelectionChange(selectedItems)
            }}
        >
            {items?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                    {item.name}
                </SelectItem>
            ))}
        </Select>
    )
};
