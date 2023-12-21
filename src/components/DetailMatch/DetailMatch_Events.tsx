const DetailMatchEvent = ({ events, match }: { events: any; match: any }) => {
  return (
    <div
      className="content"
      id="cornerOddsDiv"
      style={{ backgroundColor: "white", padding: "20px 6px" }}
    >
      <div>
        <h2 className="team-table-title">Sự kiện chính</h2>
        <table className="main-event-table" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>{match?.homeName}</th>
              <th>{match?.homeScore}</th>
              <th>Phút</th>
              <th>{match.awayScore}</th>
              <th>{match.awayName}</th>
            </tr>
          </thead>
          <tbody>
            {events.events?.map((item: any, index: any) => {
              const imageStatus =
                item?.type == 1
                  ? "/images/1.png"
                  : item.type == 2
                  ? "/images/2.png"
                  : item.type == 3
                  ? "/images/3.png"
                  : item.type == 11
                  ? "/images/11.png"
                  : "";
              return (
                <tr key={index}>
                  <td
                    className="event_detail"
                    width={"40%"}
                    style={{ textAlign: "end", padding: "0 10px" }}
                    dangerouslySetInnerHTML={{
                      __html: item.homeEvent
                        ? item.playerName
                            ?.replace("↑", '<img src="/images/4.png"/>')
                            ?.replace("↓", '<img src="/images/5.png"/>')
                        : "",
                    }}
                  ></td>
                  <td style={{ textAlign: "center" }}>
                    {item.homeEvent && imageStatus && <img src={imageStatus} />}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    {item.minute}
                    {`'`}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {!item.homeEvent && imageStatus && (
                      <img src={imageStatus} />
                    )}
                  </td>
                  <td
                    className="event_detail"
                    width={"40%"}
                    style={{ padding: "0 10px" }}
                    dangerouslySetInnerHTML={{
                      __html: !item.homeEvent
                        ? item.playerName
                            ?.replace("↑", '<img src="/images/4.png"/>')
                            ?.replace("↓", '<img src="/images/5.png"/>')
                        : "",
                    }}
                  ></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailMatchEvent;
