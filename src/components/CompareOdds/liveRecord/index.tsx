//@ts-nocheck
import { Tabs } from "antd";
import TabPane from "antd/lib/tabs/TabPane";
import Link from "next/link";
import AsiaLive from "./AsiaLive";
import OddEvenLive from "./OddEvenLive";
import EuropeLive from "./EuropeLive";
import { useEffect, useState } from "react";
const LiveRecord = ({ liveRecord, matchTime, onNhaCaiChange }) => {
  const [key, setKey] = useState(8);
  const [keyStatus, setKeyStatus] = useState("ft")
  const onChange = (key) => {
    setKey(key);
  };
  const onStatusWatchChange = (key)=>{
    setKeyStatus(key)
  }
  useEffect(() => {
    onNhaCaiChange(key);
  }, [key]);
  return (
    <div className="live">
      <div className="main-top" style={{display:"flex"}}>
        <div className="top-left top-d-lfex" style={{flexBasis: '86%'}}>
        <Tabs
        defaultActiveKey="8"
        onChange={onChange}
        tabBarGutter={0}
      >
        <TabPane tab="Sbobet" key="31"></TabPane>
        <TabPane tab="Bet365" key="8"></TabPane>
        <TabPane tab="188Bet" key="23"></TabPane>
        <TabPane tab="M88" key="17"></TabPane>
        <TabPane tab="Crown" key="3"></TabPane>
        <TabPane tab="12Bet" key="24"></TabPane>
        <TabPane tab="18Bet" key="42"></TabPane>
        <TabPane tab="Willhill" key="9"></TabPane>
        <TabPane tab="Macauslot" key="1"></TabPane>
        <TabPane tab="Ladbrokes" key="4"></TabPane>
        <TabPane tab="Easybet" key="12"></TabPane>
        <TabPane tab="Vcbet" key="14"></TabPane>
        <TabPane tab="Interwetten" key="19"></TabPane>
        <TabPane tab="SNAI" key="7"></TabPane>
      </Tabs>
        </div>
      <div className="top-right top-d-lfex" style={{flexBasis: '14%'}}>
      <Tabs
         onChange={onStatusWatchChange}
         defaultActiveKey="ft"
         tabBarGutter={0}
         style={{float: 'right'}}
      >
        <TabPane tab="TF" key="ft"></TabPane>
        <TabPane tab="HT" key="ht"></TabPane>
      </Tabs>
        </div>
      </div>
      
      <div className="table-record" style={{ display: "flex", gap: "1rem" }}>
        <div className="record asia-record">
          <AsiaLive data={liveRecord} matchTime={matchTime} keyStatus={keyStatus}/>
        </div>
        <div className="record odd-even-record">
          <OddEvenLive data={liveRecord} matchTime={matchTime} keyStatus={keyStatus}/>
        </div>
        <div className="record euro-record">
          <EuropeLive data={liveRecord} matchTime={matchTime} keyStatus={keyStatus}/>
        </div>
      </div>
    </div>
  );
};
export default LiveRecord;
