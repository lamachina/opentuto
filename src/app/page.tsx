"use client";
import { LightMode } from "@/components/LightMode";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import AtomicalCard from "@/components/MetaData";
import { fetchAtomicalsData } from "@/utils/fetchAtomicalData";
import { fetchAdditionalData } from "@/utils/imageUtils";
import Dashboard from "./home/dashboard";

const ConnectButton = (props: any) => {
  return <Button {...props} />;
};



export default function Home() {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [atomicalImageData, setAtomicalImageData] = useState<any>(null);
  const [additionalData, setAdditionalData] = useState<any>(null);

  useEffect(() => {
    // Fetch Atomicals data
    displayCard()
  }, []);

  const displayCard = async () => {
    const data = await fetchAtomicalsData('6341fdaf0ef212ed3d4344a73df44389950442d753dc851b423ed9f541fd9a04i0');
    const image = await fetchAdditionalData(data);

    console.log("Atomicals data: ", data);

    setAtomicalImageData(data);
    setAdditionalData(image);
  };

  const handleConnectWallet = async () => {
    if (typeof window.wizz !== "undefined") {
      console.log("Wizz Wallet is installed!");
      try {
        let accounts = await window.wizz.requestAccounts();
        const connectedAddress = accounts[0];
        setConnectedAddress(connectedAddress);
        console.log("connect success", connectedAddress);


      } catch (e) {
        console.log("connect failed");
        setConnectedAddress(null);
      }
    } else {
      console.log("Wizz Wallet is not installed");
      setConnectedAddress(null);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-start h-full gap-8 px-4 md:px-12">

        {/*  <h1 className="text-4xl text-primary font-bold">
          OPEN
          <span className="text-secondary-foreground">MINT</span>
        </h1> */}

        {atomicalImageData && <AtomicalCard atomicalData={atomicalImageData} additionalData={additionalData} />}
      </div>

      <Dashboard />
    </div>
  );
}
