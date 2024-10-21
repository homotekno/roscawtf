'use client'

import { contract } from "@/utils/contract";
import { prepareContractCall } from "thirdweb";
import { darkTheme, TransactionButton } from "thirdweb/react";

export function NoDue(){

    const customTheme = darkTheme({
        colors: {
          primaryButtonText: "white",
          primaryButtonBg: "red",
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
                            method: "noDueCertificate",
                        });
                    }}
                    onTransactionConfirmed={() => alert("Success!!")}
                >
                🥶 clear dues
                </TransactionButton>
            </div>
        </div>
    )
}