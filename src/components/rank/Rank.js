import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div className="mv4">
      <div className="pa1 purple f2">
        {`${name}, your current entry count is...`}
      </div>
      <div className="pt4 b purple f1">{entries}</div>
    </div>
  );
};

export default Rank;
