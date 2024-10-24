'use client'

import { contract } from "@/utils/contract";
import { prepareContractCall } from "thirdweb";
import { darkTheme, TransactionButton } from "thirdweb/react";

export function Enrol(){

    const customTheme = darkTheme({
        colors: {
          primaryButtonText: "white",
          primaryButtonBg: "blue",
        },
    });

    return(
        <div className="space-y-1 mb-6">
            <div className="w-full flex flex-col items-center mt-10">
                <TransactionButton
                    theme={customTheme}
                    transaction={async () => {
                        return prepareContractCall({
                            contract: contract,
                            method: "enroll",
                        });
                    }}
                    onTransactionConfirmed={() => alert("Success!!")}
                >
                🚀 enrol
                </TransactionButton>
            </div>
        </div>
    )
}