"use client"
import { useRouter } from 'next/navigation'

export default function Companies() {

    const router = useRouter()

    const handleSubmit = () => {
        router.push('/companies/list')
    }

    return (
        <form className="flex-1 flex justify-center items-center flex-col" onSubmit={handleSubmit}>
            <p>Enter your company Details</p>
            <input name="Name" placeholder="Name" className="companyDetails" required></input>
            <input name="Location" placeholder="Location" className="companyDetails" required></input>
            <input name="KYC" placeholder="KYC" className="companyDetails" required></input>
            <input type="submit" value={"SUBMIT"} className="py-2 px-4 bg-red-500 rounded-2xl mt-10 cursor-pointer"/>
        </form>
    )
}