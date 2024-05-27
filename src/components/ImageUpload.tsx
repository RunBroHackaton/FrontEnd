"use client"

import { useState, useRef, ChangeEvent } from "react"
import Image from "next/image";


export default function ImageUpload () {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false)
    const [cid, setCid] = useState("")

    const upload = useRef<HTMLInputElement>(null);

    const uploadFile = async (fileToUpload: File) => {
        try {
            console.log("UPLOADING...")
          setUploading(true);
          const data = new FormData();
          data.set("file", fileToUpload);
          const res = await fetch("/api/files", {
            method: "POST",
            body: data,
          });
          const resData = await res.json();
          setCid(resData.IpfsHash);    
          setUploading(false);     
        } catch (e) {
          console.log(e);
          setUploading(false);
          alert("Trouble uploading file");
        }
    };
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            uploadFile(e.target.files[0]);
        }
    };

    return(
        <div className="flex flex-col justify-center items-center space-y-10">
            <input type="file" name="myImage" accept="image/png, image/gif, image/jpeg" ref={upload} onChange={handleChange} className="hidden"/>
            <button className="actionButton" onClick={() => {upload.current?.click()}} disabled={uploading}>{uploading ? "Uploading..." : "Upload Image"}</button>
            {cid ? (
                <div className="w-[300px] h-[270px] relative border-red-500 border-2">
                    <Image
                        loader={() => `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`}
                        src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`}
                        alt="Image from IPFS"
                        fill
                    />
                </div>
            ) : (
                <div className="relative w-[300px] h-[270px] border-red-500 border-2">
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">Image preview</p>
                </div>
            )}
      </div>
    )
}