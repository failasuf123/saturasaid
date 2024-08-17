"use server"
import { utapi } from "@/app/server/uploadthing"

export const removeImage = async(imageKey) => {
    try {
        console.log("from Server WANNA remove", imageKey)
        await utapi.deleteFiles(imageKey);
        console.log("from Server JUST remove", imageKey)
    } catch (error) {
        return {success:false};
    }

}