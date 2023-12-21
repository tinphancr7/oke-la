  //@ts-nocheck

import { API_SPORT } from "@/config/config";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const convertPosition = (id) => {
  let text = "";
  switch (id) {
    case "Goalkeeper":
      text = "GK";
      break;
    case "Right Fullback":
      text = "RF";
      break;
    case "Left Fullback":
      text = "LF";
      break;
    case "Center Back":
      text = "CB";
      break;
    case "Right Back":
      text = "RB";
      break;
    case "Left Back":
      text = "LB";
      break;
    case "Striker":
      text = "SK";
      break;
    case "Defensive Midfield":
      text = "DM";
      break;
    case "Right Winger":
      text = "RW";
      break;
    case "Left Winger":
      text = "LW";
      break;
  }
  return text;
};

const columnsHome = [
  {
    title: (
      <>
        <div className="recent-achievement-header-home">
          <div style={{ paddingTop: "3px" }}>
            <a style={{ paddingRight: "12px", color: "#000" }}>BUFC</a>
          </div>
        </div>
      </>
    ),
    dataIndex: "asia",
    width: 100,
    fixed: "center",
    render: (value) => <div style={{ color: "black" }}>{value?.host[0]}</div>,
  },
];

const columnsAway = [
  {
    title: (
      <>
        <div className="recent-achievement-header-away">
          <div style={{ paddingTop: "3px" }}>
            <a style={{ paddingRight: "12px", color: "#000" }}>Kodagu FC</a>
          </div>
        </div>
      </>
    ),
    dataIndex: "asia",
    width: 100,
    fixed: "center",
    render: (value) => <div style={{ color: "black" }}>{value?.host[0]}</div>,
  },
];

const data = [];
for (let i = 0; i < 1; i++) {
  data.push({
    key: i,
    company: "Sbobet",
    asia: {
      host: ["0.9", "0.9"],
      HDP: ["-2/2.5", "-2/2.5"],
      guest: ["0.9", "0.9"],
    },
    odds1x2: {
      host: ["12.00", "12.00"],
      draw: ["7.00", "7.00"],
      guest: ["1.15", "1.15"],
    },
    handicap: {
      talent: ["0.9", "0.9"],
      odds: ["3.5/4", "3.5/4"],
      faint: ["0.9", "0.9"],
    },
  });
}
const InjuriesAndSuspensions = ({ injury }) => {
  const router = useRouter();
  const [dataInjury, setDataInjury] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const dataInjury = await axios.get(
        `${API_SPORT}/api/getInjuryAndLineups?matchId=${router.query?.pid}`
      );

      return dataInjury.data;
    };
    if (router.query?.pid) {
      getData().then((data) => {
        setDataInjury(data);
      });
    }
  }, [router.asPath]);
  return (
    <div className="porletP" id="porletP13">
      {dataInjury?.data?.length > 0 && (
        <>
          <h2 className="team-table-title" style={{ marginBottom: "20px" }}>
            Chấn thương và Án treo giò
          </h2>
          <br />
          <div className="team-div">
            <div className="home-div">
              <div className="home-m">
                <b>{dataInjury.homeName}</b>
              </div>
              <div className="Lineup">Chấn thương</div>

              <div className="player-list">
                {dataInjury.data?.map((item, index) => {
                  if (item.teamId === dataInjury.homeId) {
                    return (
                      <div className="player-row" key={index}>
                        <b>{convertPosition(item.playerInfo?.[0].position)}</b>
                        <span>{item.playerInfo?.[0].number}</span>
                        <a>{item.name}</a>
                      </div>
                    );
                  }
                })}
              </div>

              <div className="Backup">Án treo giò</div>
              <div className="player-list"></div>
            </div>
            <div className="guest-div">
              <div className="guest-m">
                <b>
                  <b>{dataInjury.awayName}</b>
                </b>
              </div>
              <div className="Lineup">Chấn thương</div>

              <div className="player-list">
                {dataInjury.data?.map((item, index) => {
                  if (item.teamId === dataInjury.awayId) {
                    return (
                      <div className="player-row" key={index}>
                        <b>{convertPosition(item.playerInfo?.[0].position)}</b>
                        {"  "}
                        <span>{item.playerInfo?.[0].number}</span>
                        <a>{item.name}</a>
                      </div>
                    );
                  }
                })}
              </div>

              <div className="Backup">Án treo giò</div>
              <div className="player-list"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InjuriesAndSuspensions;
