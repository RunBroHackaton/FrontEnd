import { NextResponse } from "next/server";
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

export async function POST(request : Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    data.append("file", file);
    data.append("pinataMetadata", JSON.stringify({ name: "File to upload" }));
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: data,
    });
    const { IpfsHash } = await res.json();
    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req : Request) {
  try {
    const result = await pinata.pinList(
      { pinataJWTKey: process.env.PINATA_JWT },
      {
        pageLimit: 1,
      }
    );

    const data = await result.json()
    return new Response(data.rows[0])
  } catch (e) {
    console.log(e);
    return new Response("Server Error", {status: 500})
  }
}
