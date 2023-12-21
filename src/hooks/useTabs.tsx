import React, { useState } from "react";

const useTabs = (arrTab: any) => {
  const [tab, setTab] = useState(arrTab[0].nameEn);
  return {
    tab,
    setTab,
  };
};

export default useTabs;
