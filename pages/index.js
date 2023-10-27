import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Tile from "../components/Tile";
import TransactionForm from "../components/TransactionForm";
import TransactionHistory from "../components/TransactionHistory";
import { useState } from "react";
import { CustomToastContainer } from "../components/Toastify";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  const handleTransactionSubmit = (formData) => {
    const newTransaction = {
      account_id: formData.account_id,
      amount: formData.amount,
    };
    setTransactions(newTransaction); // display last transaction at top
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Frontend Application with React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {/* <Hero /> */}
        {/* <Tile /> */}
        <div className="flex">
          <div className="p-2">
            <TransactionForm onTransactionSubmit={handleTransactionSubmit} />
          </div>

          <div className="p-2 h-85 w-65">
            <TransactionHistory transactions={transactions} />
          </div>
          <CustomToastContainer />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
