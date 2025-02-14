import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LinearChart = () => {
  // Generate data points with dates
  const generateData = () => {
    const data = [];
    
    // First segment: Feb 1-14
    for (let day = 1; day <= 14; day++) {
      const currentDate = new Date('2025-02-' + day.toString().padStart(2, '0'));
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
      
      // Linear growth for first half (0 to 50)
      const linearY = ((day - 1) / 13) * 50;
      
      data.push({
        date: formattedDate,
        day: day,
        firstHalf: parseFloat(linearY.toFixed(2)),
        // Add the intersection point at day 14
        secondHalf: day === 14 ? 50 : null
      });
    }
    
    // Second segment: Feb 14-28
    for (let day = 14; day <= 28; day++) {
      const currentDate = new Date('2025-02-' + day.toString().padStart(2, '0'));
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
      
      // Linear growth for second half (50 to 100)
      const linearY = 50 + ((day - 14) / 14) * 50;
      
      // Don't add duplicate point for day 14
      if (day > 14) {
        data.push({
          date: formattedDate,
          day: day,
          firstHalf: null,
          secondHalf: parseFloat(linearY.toFixed(2))
        });
      }
    }
    
    return data.sort((a, b) => a.day - b.day);
  };

  const data = generateData();

  return (
    <div className="w-full h-96 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            interval={1}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            domain={[0, 100]}
            tickCount={11}
          />
          <Tooltip 
            labelFormatter={(label) => `Date: ${label}`}
            formatter={(value, name) => [
              `${value}%`, 
              name === 'firstHalf' ? 'Value (Solid)' : 'Value (Dotted)'
            ]}
          />
          
          {/* Solid line from Feb 1-14 */}
          <Line
            type="monotone"
            dataKey="firstHalf"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={false}
            connectNulls={false}
          />
          
          {/* Dotted line from Feb 14-28 */}
          <Line
            type="monotone"
            dataKey="secondHalf"
            stroke="#82ca9d"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LinearChart;