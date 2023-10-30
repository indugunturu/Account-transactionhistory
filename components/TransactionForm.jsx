import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateURL } from "../utils/constants";

function TransactionForm({ onTransactionSubmit }) {
  const [formData, setFormData] = useState({
    account_id: "",
    amount: "",
  });
  const [errors, setErrors] = useState({
    account_id: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = { account_id: "", amount: "" };
    // Validate Account ID
    if (!formData.account_id) {
      newErrors.account_id = "Account ID is required";
    } else if (!/^[0-9]+$/.test(formData.account_id)) {
      newErrors.account_id = "Account ID must be a number";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 //   if (validateForm()) {
  const isHEX = (ch) => "0123456789abcdef".includes(ch.toLowerCase());

  const isGuidValid = (guid) => {
    guid = guid.replaceAll("-", ""); // Format it first!
    return guid.length === 32 && [...guid].every(isHEX);
  };      console.log("account", formData.account_id);
      const uuid = uuidv4({
        random: [...Array(16)].map(() => formData.account_id),
      });
      axios
        .post(updateURL, { account_id: isGuidValid(formData.account_id) ? formData.account_id: uuid, amount: formData.amount })
        .then((response) => {
          onTransactionSubmit(formData);
          console.log("Data updated successfully", response.data);
          toast.success("Data updated successfully");
        })
        .catch((error) => {
          console.error("Error updating data", error);
          toast.error("Error updating data" + error);
        });

      setFormData({ account_id: "", amount: "" }); // clear form after submit
  //  }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-600">
        Submit new transaction
      </h2>
      {console.log("form render")}
      <form id="transaction"
        onSubmit={handleSubmit}
        className="border-2 border-grey-600 p-2 m-2 rounded-md"
      >
        <div>
          <div className="text-left">
            {" "}
            <label>Account ID:</label>
          </div>
          <div>
            <input
              type="text" data-type="account-id"
              className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Account Number"
              name="account_id"
              value={formData.account_id}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-gray-600">{errors.account_id}</div>
        </div>
        <div>
          <div className="text-left">
            <label>Amount:</label>
          </div>
          <div>
            <input data-type="amount"
              className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
          <div className="error">{errors.amount}</div>
        </div>
        <div className="p-2">
          <input data-type="transaction-submit"  text= "Submit"
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            type="submit"
          />
           
                  </div>
      </form>
    </div>
  );
}

export default TransactionForm;
