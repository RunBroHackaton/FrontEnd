"use client"

import { useState, useRef } from "react"

export default function PrettyInput({type, name, label, min, max} : {type: string, name: string, label: string, min: number, max: number}) {

    const [input, setInput] = useState("")
    const [focus, setFocus] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleBlur = () => {
        if (!input && inputRef.current) {
            inputRef.current.value = "";
        }
        setFocus(false)
    }

    return (
        <div className="prettyInput">
            <input className="input-wrapper" type={type} name={name} min={type === "number" ? min : undefined} max={type === "number" && max !== 0 ? max : undefined} onChange={(e) => {setInput(e.target.value)}} onFocus={() => {setFocus(true)}} onBlur={handleBlur} ref={inputRef} required />
            <label className={`input-label ${!focus && input ? "input-label-focus-none" : focus ? "input-label-focus" : ""}`}>{label}</label>
        </div>
    )
}