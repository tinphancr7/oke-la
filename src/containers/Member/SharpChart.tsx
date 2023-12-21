import dynamic from "next/dynamic";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function SharpChart() {
  const [data, setData] = useState<any>({
    series: [
      {
        name: "",
        data: [
          1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09,
          0.34, 3.88, 13.07, 5.8,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 300,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -9999,
                to: 0,
                color: "#F15B46",
              },
              {
                from: 0,
                to: 9999,
                color: "#FEB019",
              },
            ],
          },
          columnWidth: "90%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: undefined,
          title: {
            formatter: () => "",
          },
        },
      },
      yaxis: {
        title: {
          text: "",
        },
        labels: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2011-01-01",
          "2011-02-01",
          "2011-03-01",
          "2011-04-01",
          "2011-05-01",
          "2011-06-01",
          "2011-07-01",
          "2011-08-01",
          "2011-09-01",
          "2011-10-01",
          "2011-11-01",
          "2011-12-01",
          "2012-01-01",
          "2012-02-01",
        ],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    },
  });
  return (
    <div className="col-span-12 lg:col-span-5 shadow h-fit order-3">
      <div className="bg-secondary border-l-[20px] border-primary p-1 text-sm font-semibold text-white rounded-t-[4px] flex items-center justify-between">
        <div>Phong độ soi kèo 14 ngày</div>
      </div>
      <div>
        <Chart
          options={data?.options}
          series={data?.series}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
}

export default SharpChart;
