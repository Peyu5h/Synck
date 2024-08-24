"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRef, useState, useEffect } from "react";
import InputField from "../InputField";
import { useFormik } from "formik";
import { editProfileSchema } from "@/lib/yupValidation";
import Image from "next/image";
import { useToast } from "../ui/use-toast";
import { updateProfile } from "@/app/(main)/users/[username]/action";
import { useQueryClient } from "@tanstack/react-query";

export function EditProfile({ user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [initialValues, setInitialValues] = useState({
    displayName: user.displayName || "",
    avatarUrl: user.avatarUrl || "",
    bio: user.bio || "",
  });

  const queryClient = useQueryClient();

  const CLOUDINARYSEC = "wzj4shyr";
  const { toast } = useToast();

  const uploadImg = async () => {
    try {
      const formData = new FormData();
      formData.append("upload_preset", CLOUDINARYSEC);
      formData.append("file", selectedFile);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkysrpdi6/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      const url = data.secure_url;
      console.log(url);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 5) {
      alert("File size should be less than 5MB");
      return;
    }
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      setSelectedFile(file);
    } else {
      alert("Invalid file type. Please select a jpg, jpeg, png, or webp file.");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: editProfileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (selectedFile) {
          const url = await uploadImg();
          values.avatarUrl = url;
        }

        await updateProfile(user.id, values);

        toast({
          description: "Profile updated successfully",
        });
        queryClient.invalidateQueries({
          queryKey: ["post-feed", "user-posts", user.id],
        });

        closeRef.current.click();
        setInitialValues(values);
      } catch (error) {
        console.error("Error updating profile:", error);
        toast({
          description: "Failed to update profile",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    status,
    isSubmitting,
  } = formik;

  const isValuesEqual =
    values.displayName === initialValues.displayName &&
    values.bio === initialValues.bio &&
    values.avatarUrl === initialValues.avatarUrl;

  const closeRef = useRef(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border border-primary bg-card hover:bg-primary"
          variant="outline"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogClose asChild>
        <Button ref={closeRef} className="hidden" variant="outline"></Button>
      </DialogClose>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <div className="group relative mx-auto h-24 w-24">
              <input
                type="file"
                ref={fileInputRef}
                style={{ position: "absolute", top: 0, left: 0, opacity: 0 }}
                onChange={handleFileInputChange}
                accept="image/png, image/jpeg, image/jpg, image/webp"
              />
              <div
                className="absolute hidden h-24 w-24 cursor-pointer rounded-full px-2 pt-6 text-center text-sm text-white transition-all duration-300 ease-out group-hover:block group-hover:bg-black/60"
                style={{ zIndex: 1 }}
                onClick={handleImageClick}
              >
                <span>Click to </span>
                <span>Upload</span>
              </div>
              {selectedFile ? (
                <Image
                  className="h-24 w-24 rounded-full object-cover"
                  src={URL.createObjectURL(selectedFile)}
                  alt=""
                  width={96}
                  height={96}
                />
              ) : (
                <Image
                  className="absolute h-24 w-24 rounded-full object-cover"
                  src={user.avatarUrl}
                  alt=""
                  width={96}
                  height={96}
                />
              )}
            </div>
            <InputField
              id="displayName"
              label="Name"
              value={values.displayName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.displayName}
              touched={touched?.displayName}
            />

            <InputField
              id="bio"
              label="Bio"
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.bio}
              touched={touched?.bio}
            />
            {status && <div className="text-sm text-red-500">{status}</div>}
          </form>
          <DialogFooter>
            <div className="cursor-not-allowed">
              <Button type="submit" disabled={isValuesEqual && !selectedFile}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
