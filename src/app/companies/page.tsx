"use client"
import PrettyInput from '@/ui/PrettyInput'
import { useRouter } from 'next/navigation'

export default function Companies() {

    const router = useRouter()

    const handleSubmit = () => {
        router.push('/companies/list')
    }

    return (
        <form className="flex-1 flex justify-center items-center flex-col space-y-8" onSubmit={handleSubmit}>
            <p>Enter your company Details</p>
            <PrettyInput type="text" name='Name' label='Company Name' min={0} max={0} />
            <PrettyInput type="text" name='Location' label='Company Location' min={0} max={0} />
            <PrettyInput type="text" name='KYC' label='Company Details' min={0} max={0} />
            <input type="submit" value={"SUBMIT"} className="py-2 px-4 bg-red-500 rounded-2xl mt-10 cursor-pointer"/>
        </form>
    )
}