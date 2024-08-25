import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export default function BasicGauge() {
  return (
    <Gauge
      width={400}
      height={400}
      value={50}
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          
        },
      }}
      text={({ value, valueMax }) => `${value} / ${valueMax}`}
    />
  );
}
