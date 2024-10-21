'use client'

import { contract } from "@/utils/contract";
import { toEther } from "thirdweb";
import { useReadContract } from "thirdweb/react"
import { Rotate } from "./Rotate";
import { Winner } from "./Winner";
import { Enrol } from "./Enrol";

export function Loop(){


    const { data : slots } = useReadContract({
        contract : contract,
        method : "slots"
    });
    const slotsStr = slots ? slots.toString() : "0"

    const { data : currentRound } = useReadContract({
        contract : contract,
        method : "currentRound"
    });
    const currentRoundStr = currentRound ? currentRound.toString() : BigInt(0)

    const { data : deadlineforRound} = useReadContract({
        contract : contract,
        method : "deadlineforRound",
        params : [currentRound ? currentRound : BigInt(0)]

    })
    const deadline = deadlineforRound ? (deadlineforRound).toString() : "0"

    

    const { data : totalContributionforRound} = useReadContract({
        contract : contract,
        method : "totalContributionforRound",
        params : [currentRound ? currentRound : BigInt(0)]

    })
    const total = totalContributionforRound ? toEther(totalContributionforRound).toString() : "0"

    const { data : winningBidforRound} = useReadContract({
        contract : contract,
        method : "winningBidforRound",
        params : [currentRound ? currentRound : BigInt(0)]

    })
    const bid = winningBidforRound ? (winningBidforRound).toString() : "0"


    function truncate(value: string | number, decimalPlaces: number): number {
        const numericValue: number = Number(value);
        if (isNaN(numericValue)) {
            throw new Error('Invalid input: value must be convertible to a number.');
        }
        const factor: number = Math.pow(10, decimalPlaces);
        return Math.trunc(numericValue * factor) / factor;
    }

    const formatTime = (seconds: number): string => {
        const date = new Date(seconds * 1000); // Convert seconds to milliseconds
        return date.toLocaleString(); // Extract HH:MM:SS part from ISO string
      };


    return(
        <div className="w-full h-full flex flex-col items-center border-2 border-blue-500 py-6 my-3 rounded">
            <span className="text-red-500 my-1 text-base text-white font-bold">⭕️ round {currentRoundStr} / {slotsStr} </span>
            <span className="text-red-500 my-1">⏳  {deadline ? formatTime(Number(deadline)) : "No deadline set"} </span>            
            <div className="w-full h-full flex justify-center mt-3 font-bold">
                <span className="text-lg text-blue-500 my-1 mx-3">💰</span>
                <span className="text-lg text-blue-500 my-1"> {truncate(total, 2)} IN₹</span>
            </div>
            <div className="w-full h-full flex justify-center font-bold">
                <span className="text-lg text-blue-500 my-1 mx-3">🙋‍♀️</span>
                <span className="text-lg text-red-500 my-1"> {bid} %</span>
            </div>

            {currentRoundStr === "0" ? (
                <Enrol/>
            ) : deadline && Date.now() > Number(deadline) * 1000 ? (
                <Rotate/> 
            ) : (
                <Winner/>
            )
            }
        </div>
    )
}