  //@ts-nocheck
//new RecentLineups
import { API_SPORT } from "@/config/config";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";


const RecentLineups = ({ data }) => {
  const router = useRouter();
  const [dataLineUps, setDataLineUps] = useState([]);
  const [formation1, setFormation] = useState("");
  const convertPosition = (id, formation = formation1) => {
    let formationLength = formation.length;
    let text = "";
    if (formationLength === 3) {
      switch (id) {
        case 0:
          text = "GK";
          break;
        case 1:
          text = "DC";
          break;
        case 2:
          text = "DM";
          break;
        case 3:
          text = "CF";
          break;
      }
    } else if (formationLength === 4) {
      switch (id) {
        case 0:
          text = "GK";
          break;
        case 1:
          text = "DC";
          break;
        case 2:
          text = "DM";
          break;
        case 3:
          text = "RW";
          break;
        case 4:
          text = "CF";
          break;
      }
    } else {
      switch (id) {
        case 0:
          text = "GK";
          break;
        case 1:
          text = "DC";
          break;
        case 2:
          text = "DM";
          break;
        case 3:
          text = "OM";
          break;
        case 4:
          text = "CF";
          break;
        case 5:
          text = "DG";
          break;
      }
    }

    return text;
  };
  useEffect(() => {
    const getData = async () => {
      const dataLineUpsReq = await axios.get(
        `${API_SPORT}/api/getLineUpV2?matchId=${router.query?.pid}`
      );
      return dataLineUpsReq.data;
    };
    if (router.query?.pid) {
      getData().then((data) => {
        setDataLineUps(data);
      });
    }
  }, [router.asPath]);
  return (
    <div className="porletP" id="porletP14">
      {dataLineUps?.length > 0 && (
        <>
          <h2 style={{ marginBottom: "20px" }} className="team-table-title">
            Đội hình gần đây
          </h2>
          <br />
          <div className="team-div">
            <div className="home-div">
              <div className="home-m">
                <b>{dataLineUps.homeName}</b>
              </div>
              <div className="Lineup">Đội hình</div>
              <div className="player-list">
                {dataLineUps.data?.homeLineup?.map((item) => (
                  <div className="player-row" key={item?.playerId}>
                    <b>{convertPosition(item.position)}</b>
                    <span>{item.number}</span>
                    <a>{item.name}</a>
                  </div>
                ))}
              </div>
              <div className="Backup">Dự bị</div>
              <div className="player-list">
                {dataLineUps.data?.homeBackup?.map((item) => (
                  <div key={item.playerId} className="player-row">
                    <b>
                      {item.position !== 0
                        ? convertPosition(item.position)
                        : ""}
                    </b>
                    <span>{item.number}</span>
                    <a>{item.name}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="guest-div">
              <div className="guest-m">
                <b>{dataLineUps.awayName}</b>
              </div>
              <div className="Lineup">Đội hình</div>

              <div className="player-list">
                {dataLineUps.data?.awayLineup?.map((item) => (
                  <div key={item.playerId} className="player-row">
                    <b>{convertPosition(item.position)}</b>
                    <span>{item.number}</span>
                    <a>{item.name}</a>
                  </div>
                ))}
              </div>

              <div className="Backup">Dự bị</div>
              <div className="player-list">
                {dataLineUps.data?.awayBackup?.map((item) => (
                  <div key={item.playerId} className="player-row">
                    <b>
                      {item.position !== 0
                        ? convertPosition(item.position)
                        : ""}
                    </b>
                    <span>{item.number}</span>
                    <a>{item.name}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentLineups;
