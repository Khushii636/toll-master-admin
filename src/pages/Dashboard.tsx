import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Receipt,
  DollarSign,
  Car,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Plus,
  Eye,
  RefreshCw,
  MoreHorizontal,
  BarChart3
} from "lucide-react";

const metrics = [
  {
    title: "Total Fines",
    value: "2,847",
    change: "+12%",
    changeType: "increase",
    icon: Receipt,
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
  {
    title: "Toll Revenue",
    value: "$45,230",
    change: "+8.2%",
    changeType: "increase",
    icon: DollarSign,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    title: "Registered Vehicles",
    value: "18,592",
    change: "+3.1%",
    changeType: "increase",
    icon: Car,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Active Violations",
    value: "156",
    change: "-15%",
    changeType: "decrease",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
];

const recentFines = [
  { id: "F001", vehicle: "ABC-123", amount: "$150", type: "Speeding", status: "Pending" },
  { id: "F002", vehicle: "XYZ-789", amount: "$75", type: "Parking", status: "Paid" },
  { id: "F003", vehicle: "DEF-456", amount: "$200", type: "Red Light", status: "Pending" },
  { id: "F004", vehicle: "GHI-321", amount: "$100", type: "No Seat Belt", status: "Paid" },
];

const recentTolls = [
  { id: "T001", location: "Highway 101 North", revenue: "$2,340", vehicles: 156 },
  { id: "T002", location: "Bridge Crossing", revenue: "$1,890", vehicles: 98 },
  { id: "T003", location: "Downtown Tunnel", revenue: "$3,450", vehicles: 203 },
];

export default function Dashboard() {
  const { toast } = useToast();

  const handleQuickAction = () => {
    toast({
      title: "Quick Actions",
      description: "Select an action from the menu",
    });
  };

  const handleViewFines = () => {
    toast({
      title: "Fines Management",
      description: "Navigating to fines management...",
    });
  };

  const handleViewTolls = () => {
    toast({
      title: "Toll Details",
      description: "Loading toll performance details...",
    });
  };

  const handleMetricClick = (title: string) => {
    toast({
      title: `${title} Details`,
      description: `Viewing detailed analytics for ${title.toLowerCase()}`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Dashboard Overview</h2>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            className="transition-all hover:scale-105"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button 
            onClick={handleQuickAction}
            className="bg-primary hover:bg-primary-hover transition-all hover:scale-105"
          >
            <Plus className="mr-2 h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card 
            key={index} 
            className="shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 group"
            onClick={() => handleMetricClick(metric.title)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor} group-hover:scale-110 transition-transform`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <TrendingUp className={`h-3 w-3 ${
                  metric.changeType === 'increase' ? 'text-success' : 'text-destructive'
                }`} />
                <span className={metric.changeType === 'increase' ? 'text-success' : 'text-destructive'}>
                  {metric.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Fines */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Recent Fines</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleViewFines}
                className="transition-all hover:scale-105"
              >
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentFines.map((fine, index) => (
                <div 
                  key={fine.id} 
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{fine.id}</span>
                      <Badge variant="outline" className="group-hover:border-primary transition-colors">{fine.vehicle}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{fine.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{fine.amount}</div>
                    <Badge variant={fine.status === 'Paid' ? 'default' : 'secondary'} className="transition-all">
                      {fine.status === 'Paid' ? <CheckCircle className="mr-1 h-3 w-3" /> : null}
                      {fine.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Toll Performance */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Toll Performance</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleViewTolls}
                className="transition-all hover:scale-105"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTolls.map((toll, index) => (
                <div 
                  key={toll.id} 
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{toll.location}</div>
                    <div className="text-sm text-muted-foreground">{toll.vehicles} vehicles</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-success">{toll.revenue}</div>
                    <div className="text-sm text-muted-foreground">Today</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}