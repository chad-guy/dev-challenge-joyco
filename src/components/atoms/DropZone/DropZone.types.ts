import { ChangeEvent } from "react";

export interface DropZoneProps {
  attachments: File[];
  fileError?: string;
  maxAttachments: number;
  validFileTypes: string[];
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}
