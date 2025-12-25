exports.holdFunds = async (amount) => {
  return {
    status: "holding",
    message: "Funds are now held in escrow.",
    amount
  };
};

exports.releaseFunds = async (amount) => {
  return {
    status: "released",
    message: "Funds released to seller.",
    amount
  };
};
