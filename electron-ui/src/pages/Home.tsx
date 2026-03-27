import { Area, AreaChart, CartesianGrid, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SidebarWrapper } from '../components/sidebar-wrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Placeholder data for attendance records.
// Area chart with X axis = count, Y axis = month
const attendanceData = [
  { month: 'January', count: 20 },
  { month: 'February', count: 35 },
  { month: 'March', count: 25 },
  { month: 'April', count: 40 },
  { month: 'May', count: 30 },
];

function Home() {
  return (
    <SidebarWrapper title="Home">
      <div className="flex flex-row gap-6 login-card-enter">
        <Card className="w-1/2 shadow-lg">
          <CardHeader>
            <CardTitle>Your Attendance</CardTitle>
            <CardDescription>Your Attendance by month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" >
                <AreaChart data={attendanceData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickMargin={8} height={42} />
                  <YAxis dataKey="count" />
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Shadcn Radar Chart with the same data */}
        <Card className="w-1/4 shadow-lg">
          <CardHeader>
            <CardTitle>Your Attendance</CardTitle>
            <CardDescription>Your Attendance by month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" >
                <RadarChart data={attendanceData} outerRadius="75%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="month" />
                  <Tooltip />
                  <Radar
                    dataKey="count"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarWrapper>
  )
}

export default Home