import {useState} from "react";

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/OOjs_UI_icon_upload.svg/120px-OOjs_UI_icon_upload.svg.png"

type PreviewProps = {
  width?: number | string;
  height?: number | string;
};

type PhotoUploadInputProps = {
    label: string;
    inputId: string;
    preview?: PreviewProps;
    className?: string;
    onImageChange?: (i: any) => void;
};

export const PhotoUploadInput = ({ label, inputId, onImageChange = (_) => {}, preview = {}, className = '' }: PhotoUploadInputProps) => {
    const [image, setImage] = useState();

    const { height = '50px', width = '50px' } = preview;

    const onChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(URL.createObjectURL(img));

            onImageChange(img);
        }
    };

    return (
        <div className={`flex flex-col justify-center ${className}`}>
            <p className={"font-medium"}>{label}</p>

            <div className="items-center w-full max-w-md m-6 bg-white rounded-md overflow-hidden">
                <div className="flex items-center space-x-4">
                    <img src={image ?? defaultImage} alt={"Image uploaded"} width={width} height={height} />

                    <label htmlFor={inputId} className="flex items-center px-4 py-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-gray-100">
                        <span className="ml-2 text-base leading-normal">Selecione uma foto</span>
                        <input id={inputId} type='file' className="hidden" accept="image/*" onChange={onChange} />
                    </label>
                </div>
            </div>
        </div>
    )
};

