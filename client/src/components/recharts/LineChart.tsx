import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import type { FC } from 'react';
// #endregion
type IndexLineChartT = {
  data: Record<string, string | number>[]
  key: string
  maxWidth: number
}

export const IndexLineChart: FC<IndexLineChartT> = ({ data, key, maxWidth  }) => {
  return (
    <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth , margin: 'auto' }} responsive data={data}>
      <CartesianGrid stroke="var(--color-border-3)" strokeDasharray="5 5" />
      <XAxis dataKey={key} />
      <YAxis width="auto" />
      <Line
        type="linear"
        dataKey="wpm"
      />
      <Line
        type="monotone"
        dataKey="cpm"
        stroke="var(--color-chart-2)"
      />
      <Legend
        position="insideTopRight"
        offset={20}
        wrapperStyle={{
          border: '1px solid var(--color-border-3)',
          borderRadius: 5,
          padding: '1ex',
          background: 'var(--color-surface-base)',
        }}
      />
      <RechartsDevtools />
    </LineChart>
  );
}