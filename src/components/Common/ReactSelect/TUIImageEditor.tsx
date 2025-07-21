import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import ImageEditor from "tui-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";
import Spinner from "../Spinner/Spinner";
import NeutralButton from "../Buttons/NeutralButton";
import PrimaryButton from "../Buttons/PrimaryButton";

interface TUIProps {
    imageFromBlock: File | Blob | null;
    setImageFromBlock: Dispatch<SetStateAction<File | Blob | null>>;
    onClose: (editedImage: Blob) => void;
    onSave: (editedImage: Blob) => void;
}

const TUIImageEditorModal: React.FC<TUIProps> = ({
    imageFromBlock,
    setImageFromBlock,
    onClose,
    onSave,
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef = useRef<ImageEditor | null>(null);

    const [imageDataURL, setImageDataURL] = useState<string | null>(null);
    const [hasMountedEditorDiv, setHasMountedEditorDiv] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isCancelLoading, setIsCancelLoading] = useState(false);

    // Watch the container to confirm it's been mounted
    useEffect(() => {
        if (editorRef.current) {
            setHasMountedEditorDiv(true);
        }
    }, []);

    // Load File → Base64
    useEffect(() => {
        if (imageFromBlock) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setImageDataURL(reader.result);
                }
            };
            reader.readAsDataURL(imageFromBlock);
        }
    }, [imageFromBlock]);

    // Initialize editor AFTER image is loaded and div is mounted
    useEffect(() => {
        if (!imageDataURL || !hasMountedEditorDiv || !editorRef.current) return;

        // Destroy previous instance
        if (editorInstanceRef.current) {
            editorInstanceRef.current.destroy();
            editorInstanceRef.current = null;
        }

        // Init editor
        editorInstanceRef.current = new ImageEditor(editorRef.current, {
            includeUI: {
                loadImage: {
                    path: imageDataURL,
                    name: "selected-image",
                },
                // menu: ["mask", "resize", "crop", "flip", "rotate", "draw", "shape", "icon", "text", "filter"],
                menu: ["shape", "text"],
                initMenu: "shape",
                menuBarPosition: "bottom",
                uiSize: {
                    width: "100%",
                    height: "700px",
                },
                theme: {},
            },
            cssMaxWidth: 700,
            cssMaxHeight: 500,
            usageStatistics: false, 
        });

        setIsLoading(false);

        return () => {
            editorInstanceRef.current?.destroy();
            editorInstanceRef.current = null;
        };
    }, [imageDataURL, hasMountedEditorDiv]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setImageFromBlock(selected); // parent will trigger reload
        }
    };

    const handleCancel = async () => {
        setIsCancelLoading(true);
        const dataUrl = editorInstanceRef.current?.toDataURL();
        if (!dataUrl) return;
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        onClose(blob);
        setIsCancelLoading(false);
    };

    const handleSave = async () => {
        setIsSaveLoading(true);
        const dataUrl = editorInstanceRef.current?.toDataURL();
        if (!dataUrl) return;
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        onSave(blob);
        setIsSaveLoading(false);
    };

    return (
        <div className="z-50 flex flex-col items-center justify-center max-h-[70vh]">
            <div className="p-4 border-b bg-neutral-100 w-full">
                <label>Use input field below only if you want to use a new image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block border p-2 text-sm w-full bg-white mt-3"
                />
            </div>

            <div className="bg-white overflow-auto w-full shadow-lg w-full">

                <div className="relative min-h-[400px]">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-80">
                            <div className="text-gray-600 text-sm">Image Editor Loading...</div>
                        </div>
                    )}
                    <div ref={editorRef} className="tui-editor-root" />
                </div>

                <div className="flex justify-between p-4 bg-gray-100 border-t">
                    <NeutralButton
                        onClick={handleCancel}
                        style="px-4 py-2"
                    >
                        {isCancelLoading ? <Spinner /> : "Cancel"}
                    </NeutralButton>
                    <PrimaryButton
                        onClick={handleSave}
                        style="px-4 py-2"
                    >
                        {isSaveLoading ? <Spinner /> : "Save Image"}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default TUIImageEditorModal;
