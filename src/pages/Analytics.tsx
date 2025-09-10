import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  Car,
  Calendar
} from "lucide-react";

// Mock data for charts
const dailyRevenueData = [
  { day: 'Mon', fines: 2400, tolls: 3200 },
  { day: 'Tue', fines: 1800, tolls: 2800 },
  { day: 'Wed', fines: 3200, tolls: 3800 },
  { day: 'Thu', fines: 2800, tolls: 4200 },
  { day: 'Fri', fines: 4200, tolls: 4800 },
  { day: 'Sat', fines: 3600, tolls: 3400 },
  { day: 'Sun', fines: 2200, tolls: 2600 },
];

const violationTypeData = [
  { name: 'Speeding', value: 45, color: '#3b82f6' },
  { name: 'Parking', value: 25, color: '#10b981' },
  { name: 'Red Light', value: 20, color: '#f59e0b' },
  { name: 'No Seatbelt', value: 10, color: '#ef4444' },
];

const monthlyTrendData = [
  { month: 'Jan', violations: 1200, revenue: 85000 },
  { month: 'Feb', violations: 1100, revenue: 78000 },
  { month: 'Mar', violations: 1400, revenue: 92000 },
  { month: 'Apr', violations: 1300, revenue: 88000 },
  { month: 'May', violations: 1600, revenue: 95000 },
  { month: 'Jun', violations: 1800, revenue: 102000 },
];

const tollPerformanceData = [
  { location: 'Highway 101', revenue: 45230, vehicles: 1256 },
  { location: 'Bridge Crossing', revenue: 32100, vehicles: 890 },
  { location: 'Downtown Tunnel', revenue: 38940, vehicles: 1102 },
  { location: 'Express Lane', revenue: 28750, vehicles: 645 },
  { location: 'Airport Access', revenue: 51200, vehicles: 1434 },
];

export default function Analytics() {
  const totalRevenue = dailyRevenueData.reduce((sum, day) => sum + day.fines + day.tolls, 0);
  const weeklyChange = 8.2; // Mock percentage change
  const totalViolations = violationTypeData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Traffic Analytics</h2>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Last 7 days</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Weekly Revenue</div>
                <div className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</div>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-success">+{weeklyChange}%</span>
                </div>
              </div>
              <div className="p-2 bg-success/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Violations</div>
                <div className="text-2xl font-bold text-foreground">{totalViolations * 10}</div>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  <span className="text-destructive">-3.2%</span>
                </div>
              </div>
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Receipt className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Toll Passages</div>
                <div className="text-2xl font-bold text-foreground">5,327</div>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-success">+12.5%</span>
                </div>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Car className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Collection Rate</div>
                <div className="text-2xl font-bold text-foreground">87.3%</div>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-success">+2.1%</span>
                </div>
              </div>
              <div className="p-2 bg-warning/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Daily Revenue Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-foreground">Daily Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fines" stackId="a" fill="hsl(var(--destructive))" />
                <Bar dataKey="tolls" stackId="a" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Violation Types Pie Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-foreground">Violation Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <ResponsiveContainer width="60%" height={250}>
                <PieChart>
                  <Pie
                    data={violationTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {violationTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {violationTypeData.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <Badge variant="secondary">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-foreground">Monthly Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="violations" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Toll Performance Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-foreground">Top Performing Tolls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tollPerformanceData.map((toll, index) => (
              <div key={toll.location} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{toll.location}</div>
                    <div className="text-sm text-muted-foreground">{toll.vehicles} vehicles</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-success">${toll.revenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}