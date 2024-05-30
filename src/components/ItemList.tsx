"use client"

import Item from "@/components/Item"
import { useAccount, useReadContract, useReadContracts } from "wagmi"
import CONTRACT_ADDRESSES from "@/constants/Addresses.json"
import MARKETPLACE_ABI from "../../contract_abis/MarketPlace.json"
import { Address, Abi } from 'viem';
import { useEffect, useState } from "react"

export default function ItemList() {
    
    const [shoeList, setShoeList] = useState([])

    const { address, isConnected } = useAccount()

    const getShoeCountArray = () => {
        const end = Number(shoeCount)
        const start = 0
        return Array.from({ length: end - start + 1 }, (v, k) => k + start)
    }

    const { data: shoeCount } = useReadContract({
        abi: MARKETPLACE_ABI,
        address: CONTRACT_ADDRESSES['MARKETPLACE'] as Address,
        functionName: "s_shoeCount"
    })

    const {data: shoeMapping } = useReadContracts({
        contracts: getShoeCountArray().map((id) => ({
            abi: MARKETPLACE_ABI as Abi,
            address: CONTRACT_ADDRESSES["MARKETPLACE"] as Address,
            functionName: "s_shoes",
            args: [id]
        }))
    })

    useEffect(() => {
        if(shoeMapping){
            let result = shoeMapping.map((item) => {return item.result})
            console.log(result)
            setShoeList(result)
        }
    }, [shoeMapping])


    return (
        <div>
            {/* {itemList.map((item) => (<Item item={item} />))} */}
        </div>
    )
}