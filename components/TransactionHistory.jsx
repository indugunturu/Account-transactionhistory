import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accountHistory } from "../utils/constants";
import { accountBal } from "../utils/constants";
import axios from "axios";
const TransactionHistory = ({ transactions }) => {
  const [transactionHistory, setTransactions] = useState([]);
  const [balance, setBalnce] = useState("");
  const accountBalance = (data) => {
    axios
      .get(
        accountBal +
          data[0].account_id
      )
      .then((response) => {
        setBalnce(response.data.balance);
        console.log("respone", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data" + error);
      });
  };

  useEffect(() => {
    axios
      .get(accountHistory)
      .then((response) => {
        setTransactions(response.data);
        console.log("tra", response.data);
        accountBalance(response.data);
        toast.success("Data fetched successfully");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data" + error);
      });
  }, [transactions]);

  return (
    <div id="transactionHistory">
      <h2 className="text-3xl font-semibold text-gray-600">
        Transaction History
      </h2>
      {console.log("form history render")}
      <ul>
        {transactionHistory.map((transaction, index) => {
          if (index === 0) {
            return (
              <div
                data-type="transaction"
                data-account-id={transaction.account_id}
                data-amount={transaction.amount}
                data-balance={balance}
              >
                <li
                  key={index}
                  className="rounded-md border-2 shadow-sm p-2 m-2"
                >
                  Transferred ${transaction.amount} from account number{" "}
                  {transaction.account_id}
                  <div> The account balance {balance}</div>
                </li>
              </div>
            );
          } else {
            return (
              <div
                data-type="transaction"
                data-account-id= {transaction.account_id}
                data-amount={transaction.amount}
                data-balance={balance}
              >
              <li key={index} className="rounded-md border-2 shadow-sm p-2 m-2">
                Transferred ${transaction.amount} from account number{" "}
                {transaction.account_id}
              </li>
              </div>
            );
          }
        })}
      </ul>
      <div></div>
    </div>
  );
};

export default TransactionHistory;
