
"use client"
import { useState } from "react"
export default function Hello(){

    const [counter, setCounter] = useState(0)

    return (
        <>
        Hello world
        <h1>{counter}</h1>

        <button onClick={()=>{setCounter(prev=>prev+1)}}>Inc</button>
        </>

    )

}