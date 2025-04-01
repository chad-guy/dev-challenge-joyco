import React, { useRef, ChangeEvent } from "react";
import { DropZoneProps } from "./DropZone.types";

const DropZone: React.FC<DropZoneProps> = ({
  attachments,
  fileError,
  maxAttachments,
  validFileTypes,
  onFileChange,
  onRemoveFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileChange({
        target: { files: e.dataTransfer.files },
      } as ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const AddIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );

  const RemoveIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className="space-y-4">
      <div className="text-center py-4 border-t border-b border-dashed border-gray-600">
        <h2 className="text-xl mb-6">UPLOAD THAT JOYCO SMILE</h2>

        {attachments.length > 0 ? (
          <div
            className="bg-gray-900 p-4 rounded-md mb-4"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex space-x-2 overflow-x-auto">
              {/* File thumbnails */}
              {attachments.map((file, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Attachment ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    aria-label="Remove"
                  >
                    <RemoveIcon />
                  </button>
                </div>
              ))}

              {/* Add more button */}
              {attachments.length < maxAttachments && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 flex items-center justify-center border border-dashed border-gray-600 rounded-md hover:bg-gray-800"
                >
                  <AddIcon />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            className="bg-gray-900 p-4 py-16 mb-4 rounded-md border border-dashed border-gray-600 flex items-center justify-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="text-center">
              <AddIcon />
              <p className="text-gray-400 mt-2">PICK A FILE OR DROP IT HERE</p>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          multiple
          accept={validFileTypes.join(",")}
          className="hidden"
        />

        {fileError && <p className="text-red-500 mt-2 text-xs">*{fileError}</p>}
      </div>
    </div>
  );
};

export default DropZone;
