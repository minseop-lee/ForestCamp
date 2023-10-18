import React from "react";
import styles from "./Trend.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Trend(props) {
  const data = props.trenddata;

  // 숫자를 천단위 ","로 포맷팅하는 함수
  const formatNumber = (value) => {
    return value.toLocaleString(); // 숫자를 천단위 ","로 변환
  };

  return (
    <div className={styles.wrapper}>
      <LineChart
        width={1024}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="recentTime" />
        <YAxis domain={['auto', 'auto']} tickFormatter={formatNumber} />
        <Tooltip formatter={formatNumber} />
        <Legend iconType="plainline" payload={[]} />
        <Line
          type="monotone"
          dataKey="recentPrc"
          stroke="#82ca9d"
        />
      </LineChart>
    </div>
  );
}

export default Trend;
