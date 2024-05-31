"use client";

import { Hash } from "viem";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function TxPopup({
  hash,
  status,
}: {
  hash: Hash | undefined;
  status: string;
}) {
  const { chainId } = useAccount();

  const networkMap: { [key: number]: string } = {
    1: "https://etherscan.io/tx/", // Ethereum Mainnet
    11155111: "https://sepolia.etherscan.io/tx/", // Sepolia Testnet
    80002: "https://amoy.polygonscan.com/txt/", // Matic Testnet
  };

  const dynamicLink = () => {
    if (chainId) {
      const etherscan = networkMap[chainId];
      return `${etherscan}${hash}`;
    }
  };

  useEffect(() => {
    console.log("TEXT");
    console.log(status);
    console.log(hash);
  }, [hash]);

  return (
    <>
      {status === "error" ? (
        <div className="outer">
          <div className="inner">
            <p>
              Error!<span className="ml-1">🚫</span>
            </p>
            <a
              href={dynamicLink()}
              target="_blank"
              className="underline cursor-pointer hover:text-gray-400 hover:decoration-gray-400"
            >
              View on etherscan
            </a>
          </div>
        </div>
      ) : status === "success" ? (
        <div className="outer">
          <div className="inner">
            <p>
              Success!<span className="ml-1">🎉</span>
            </p>
            <a
              href={dynamicLink()}
              target="_blank"
              className="underline cursor-pointer hover:text-gray-400 hover:decoration-gray-400"
            >
              View on etherscan
            </a>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
