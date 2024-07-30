'use client';

import { UploadButton, UploadDropzone } from "@/app/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

const ImageUploadBeta = () => {
    const [imageUrl, setImageUrl] = useState<string>("");

    return(
        <div className="mt-20">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                // Do something with the response
                setImageUrl(res[0].url)
                console.log("Files: ", res);
                alert(`Upload Completed, ${res[0].url}`);

                }}
                onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
                }}

            />
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                // Do something with the response
                setImageUrl(res[0].url)
                console.log("Files: ", res);
                alert(`Upload Completed, ${res[0].url}`);

                }}
                onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
                }}

            />

            <div>
                THis is out image
                {imageUrl.length?(
                    <div>
                        <Image src={imageUrl} alt="image" width={300} height={200} />

                    </div>
                ):null}
            </div>
        </div>
    )
}

export default ImageUploadBeta;