"use client";

import ProposalRequest from "@/components/ProposalRequest";
import VendorModal from "@/components/VendorModal";
import { useEffect, useState } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import abi from "../../../../contract_abis/KYC.json";
import { Abi, Address } from "viem";

export default function Proposals() {
  const [showModal, setShowModal] = useState(false);
  const [chosenProposal, setChosenProposal] = useState<any>("");

  const [proposals, setProposals] = useState<any[]>();

  const handleShowModal = (proposal: {
    account: Address;
    brand: string;
    description: string;
  }) => {
    setChosenProposal(proposal);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setChosenProposal("");
    setShowModal(false);
  };

  const { data: addresses } = useReadContract({
    abi: abi,
    address: CONTRACT_ADDRESSES["KYC"] as Address,
    functionName: "getAllTheElementsInTargetArray",
    args: [],
  }) as { data: Address[] | undefined };

  const { data: proposeDetails } = useReadContracts({
    contracts: (addresses ?? []).map((address: Address) => ({
      abi: abi as Abi,
      address: CONTRACT_ADDRESSES["KYC"] as Address,
      functionName: "sellerDetails",
      args: [address],
    })),
  }) as { data: any };

  useEffect(() => {
    if (proposeDetails?.length > 0 && addresses) {
      let newArray: any[] = [];
      proposeDetails.forEach((details: any, i: number) => {
        let parsedDetails = JSON.parse(details.result);
        newArray.push({
          account: addresses[i],
          brand: parsedDetails.Brand,
          description: parsedDetails.Description,
        });
      });
      setProposals(newArray);
    }
  }, [proposeDetails]);

  return (
    <>
      <div className="flex-1 flex w-full flex-col justify-evenly">
        <div className="w-full h-[20%]">
          <p className="text-3xl text-black font-bold text-center">
            PROPOSE SECTION
          </p>
        </div>
        {proposals ? (
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-[10px] py-[2%] px-[3vw] w-[85vw] overflow-y-scroll h-[60vh] border-gray-300 border mx-auto">
            {proposals.map((proposal, i) => (
              <ProposalRequest
                first={i == 0}
                account={proposal.account}
                brand={proposal.brand}
                description={proposal.description}
                handleShowModal={handleShowModal}
                key={i}
              />
            ))}
          </div>
        ) : (
          <div className="h-[60vh] w-ffull"></div>
        )}
      </div>
      <VendorModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        item={chosenProposal}
      />
    </>
  );
}
