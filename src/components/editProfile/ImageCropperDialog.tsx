import React, { useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ImageCropperDialog = ({ isOpen, onClose, imageFile, onCropComplete }) => {
  const [cropper, setCropper] = useState<Cropper>();

  const handleCrop = () => {
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toBlob((blob) => {
        const file = new File([blob], imageFile.name, { type: imageFile.type });
        onCropComplete(file);
        onClose();
      }, imageFile.type);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Cropper
            src={imageFile ? URL.createObjectURL(imageFile) : ""}
            style={{ height: 400, width: "100%" }}
            aspectRatio={NaN}
            guides={true}
            viewMode={1}
            dragMode="none"
            cropBoxMovable={true}
            cropBoxResizable={true}
            toggleDragModeOnDblclick={false}
            zoomable={false}
            scalable={false}
            onInitialized={(instance) => setCropper(instance)}
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleCrop}>Crop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropperDialog;
