"use client"

import ImageUpload from "@/components/ImageUpload";
import PrettyInput from "@/ui/PrettyInput";

export default function List () {

    const handleSubmit = () => {

    }

    return(
        <form className="flex-1 flex flex-col items-center px-16 py-10 justify-evenly">
            <p className="text-center">List items</p>
            <div className="flex flex-row justify-evenly w-full">
                <ImageUpload />
                <div className="flex flex-col items-center justify-center space-y-12">
                    <PrettyInput type="number" name="Price" label="Product Price" min={0} max={0} />
                    <PrettyInput type="number" name="Reward" label="Reward In RB" min={0} max={0} />
                    <PrettyInput type="number" name="Steps" label="Steps Achieved" min={0} max={0} />
                </div>
            </div>
            <p className="mt-7">Platform fee: 10%</p>
            <input type="submit" className="actionButton cursor-pointer" value={"LIST"} />
        </form>
    )
}