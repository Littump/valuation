import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import dropdown from "../../../../../public/imgs/dropdown.svg";
import dropdownActive from "../../../../../public/imgs/dropdownActive.svg";
import paperclip from "../../../../../public/imgs/paperclip.svg";
import close from "../../../../../public/imgs/close.svg";
import Heading from "../../../UI/Heading/Heading.jsx";
import LightHeading from "../../../UI/LightHeading/LightHeading.jsx";
import { PurpleButton } from "../../../UI/Button/Button.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function DropComponent() {
  let dispatch = useDispatch();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      dispatch({ type: "renovation/addImage", file });
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  let files = useSelector((state) => state.renovation.images);
  let fileNames = files.map((file) => file.path);
  let DropDown = (img) => (
    <div className="flex flex-col items-center text-center gap-2 px-4">
      <img src={img} alt="" className="w-12 h-12" />
      <Heading>Перетащите фотографии квартиры сюда</Heading>
      <LightHeading>или</LightHeading>
      <PurpleButton variant="light">
        <div className="px-6">Выберите файл</div>
      </PurpleButton>
    </div>
  );
  return (
    <div className="flex gap-4 scroll flex-col lg:flex-row">
      <div
        {...getRootProps()}
        className="py-8 flex items-center justify-center cursor-pointer lg:w-7/12 stroke dark:strokeDark outline-0 border-0"
      >
        <input {...getInputProps()} />
        <div>
          {isDragActive ? DropDown(dropdownActive) : DropDown(dropdown)}
        </div>
      </div>
      <div className="lg:w-5/12 flex flex-col gap-2 max-h-60 overflow-y-scroll">
        {fileNames.map((fileName) => (
          <div
            key={fileName}
            className="bg-blue-300 py-2 px-4 rounded-lg flex gap-2 w-full items-center dark:bg-dark-600"
          >
            <img src={paperclip} alt="" />
            <Heading>
              <div className="o">{fileName.substring(0, 10)}</div>
            </Heading>
            <button
              className="close ml-auto "
              type="button"
              onClick={() => {
                dispatch({ type: "renovation/deleteImage", fileName });
              }}
            >
              <img src={close} alt="закрыть" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
