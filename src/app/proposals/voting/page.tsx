"use client";

import Proposal from "@/components/Proposal";
import VendorModal from "@/components/VendorModal";
import { useState } from "react";

export default function Proposals() {
  const [showModal, setShowModal] = useState(false);
  const [chosenProposal, setChosenProposal] = useState<any>("");

  const [proposals, setProposals] = useState([
    {
      brand: "Nike",
      description: "We are a company that is doing shoes",
    },
    { brand: "Adidas", description: "We are Nike competitors" },
    {
      brand: "Nike",
      description: "We are a company that is doing shoes",
    },
    { brand: "Adidas", description: "We are Nike competitors" },
    {
      brand: "Nike",
      description: "We are a company that is doing shoes",
    },
    { brand: "Adidas", description: "We are Nike competitors" },
    {
      brand: "Nike",
      description: "We are a company that is doing shoes",
    },
    { brand: "Adidas", description: "We are Nike competitors" },
    {
      brand: "Nike",
      description: "We are a company that is doing shoes",
    },
    { brand: "Adidas", description: "We are Nike competitors" },
    {
      brand: "Nike",
      description: "We are a company that is doing shoes",
    },
    { brand: "Adidas", description: "We are Nike competitors" },
  ]);

  const handleShowModal = (proposal: {
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

  return (
    <>
      <div className="flex-1 flex w-full flex-col justify-evenly">
        <div className="w-full h-[20%]">
          <p className="text-3xl text-black font-bold text-center">
            VOTING SECTION
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-[10px] py-[2%] px-[3vw] w-[85vw] overflow-y-scroll h-[60vh] border-gray-300 border mx-auto">
          {proposals.map((proposal, i) => (
            <Proposal
              brand={proposal.brand}
              description={proposal.description}
              handleShowModal={handleShowModal}
              key={i}
            />
          ))}
        </div>
      </div>
      <VendorModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        item={chosenProposal}
      />
    </>
  );
}
