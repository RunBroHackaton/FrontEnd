"use client"
import PrettyInput from '@/ui/PrettyInput'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Companies() {

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [KYC, setKYC] = useState("")

    const router = useRouter()

    const handleSubmit = () => {
        router.push('/companies/list')
    }

    return (
        <form className="flex-1 flex justify-center items-center flex-col space-y-8" onSubmit={handleSubmit}>
            <p>Enter your company Details</p>
            <PrettyInput type="text" name='Name' label='Company Name' min={0} max={0} input={name} setInput={setName}/>
            <PrettyInput type="text" name='Location' label='Company Location' min={0} max={0} input={location} setInput={setLocation} />
            <PrettyInput type="text" name='KYC' label='Company Details' min={0} max={0} input={KYC} setInput={setKYC} />
            <input type="submit" value={"SUBMIT"} className="py-2 px-4 bg-red-500 rounded-2xl mt-10 cursor-pointer"/>
        </form>
    )
}