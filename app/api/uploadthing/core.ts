import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getAuth } from "@clerk/nextjs/server";

 
const f = createUploadthing();
 
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug

  imageUploader: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {

      const { userId } = getAuth(req);
       if (!userId) throw new UploadThingError("Unauthorized");
  
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url); 

      return { uploadedBy: metadata.userId };
    }),

  imageUploaderAlbum: f({ image: { maxFileSize: "2MB", maxFileCount:6 } }) 
    .middleware(async ({ req }) => {

      const { userId } = getAuth(req);
       if (!userId) throw new UploadThingError("Unauthorized");
  
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url); 

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;