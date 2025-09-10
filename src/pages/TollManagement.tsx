import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, MapPin, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data
const tollsData = [
  { id: "T001", name: "Highway 101 North", location: "Mile 45.2", rate: 5.50, status: "Active", dailyRevenue: 2340, vehicles: 156, type: "Highway" },
  { id: "T002", name: "Bridge Crossing", location: "Downtown Bridge", rate: 3.25, status: "Active", dailyRevenue: 1890, vehicles: 98, type: "Bridge" },
  { id: "T003", name: "Downtown Tunnel", location: "City Center", rate: 4.75, status: "Active", dailyRevenue: 3450, vehicles: 203, type: "Tunnel" },
  { id: "T004", name: "Express Lane", location: "Highway 205", rate: 6.00, status: "Maintenance", dailyRevenue: 0, vehicles: 0, type: "Express" },
  { id: "T005", name: "Airport Access", location: "Terminal Road", rate: 8.50, status: "Active", dailyRevenue: 4250, vehicles: 98, type: "Airport" },
];

export default function TollManagement() {
  const [tolls, setTolls] = useState(tollsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingToll, setEditingToll] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rate: "",
    type: "",
    status: "Active"
  });

  const filteredTolls = tolls.filter(toll =>
    toll.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    toll.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    toll.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (!formData.name || !formData.location || !formData.rate || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const toll = {
      id: `T${String(tolls.length + 1).padStart(3, '0')}`,
      name: formData.name,
      location: formData.location,
      rate: parseFloat(formData.rate),
      status: formData.status as "Active" | "Maintenance",
      dailyRevenue: 0,
      vehicles: 0,
      type: formData.type
    };

    setTolls([...tolls, toll]);
    resetForm();
    toast({
      title: "Success",
      description: "Toll added successfully",
    });
  };

  const handleUpdate = () => {
    if (!editingToll || !formData.name || !formData.location || !formData.rate || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setTolls(tolls.map(toll => 
      toll.id === editingToll.id 
        ? { 
            ...toll, 
            name: formData.name,
            location: formData.location,
            rate: parseFloat(formData.rate),
            status: formData.status as "Active" | "Maintenance",
            type: formData.type
          }
        : toll
    ));
    
    resetForm();
    toast({
      title: "Success",
      description: "Toll updated successfully",
    });
  };

  const handleDelete = (id: string) => {
    setTolls(tolls.filter(toll => toll.id !== id));
    toast({
      title: "Success",
      description: "Toll deleted successfully",
    });
  };

  const resetForm = () => {
    setFormData({ name: "", location: "", rate: "", type: "", status: "Active" });
    setEditingToll(null);
    setIsAddDialogOpen(false);
  };

  const openEditDialog = (toll: any) => {
    setEditingToll(toll);
    setFormData({
      name: toll.name,
      location: toll.location,
      rate: toll.rate.toString(),
      type: toll.type,
      status: toll.status
    });
    setIsAddDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "Maintenance":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const totalRevenue = tolls.reduce((sum, toll) => sum + toll.dailyRevenue, 0);
  const activeTolls = tolls.filter(toll => toll.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Toll Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              Add Toll
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingToll ? 'Update Toll' : 'Add New Toll'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Toll Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Highway 101 North"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Mile 45.2"
                />
              </div>
              <div>
                <Label htmlFor="rate">Rate ($)</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.25"
                  value={formData.rate}
                  onChange={(e) => setFormData({...formData, rate: e.target.value})}
                  placeholder="e.g., 5.50"
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select toll type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Highway">Highway</SelectItem>
                    <SelectItem value="Bridge">Bridge</SelectItem>
                    <SelectItem value="Tunnel">Tunnel</SelectItem>
                    <SelectItem value="Express">Express Lane</SelectItem>
                    <SelectItem value="Airport">Airport Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={editingToll ? handleUpdate : handleAdd} 
                className="w-full bg-primary hover:bg-primary-hover"
              >
                {editingToll ? 'Update Toll' : 'Add Toll'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Daily Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{activeTolls}</div>
                <div className="text-sm text-muted-foreground">Active Tolls</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-warning/10 rounded-lg">
                <MapPin className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{tolls.length - activeTolls}</div>
                <div className="text-sm text-muted-foreground">Under Maintenance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-foreground">All Tolls</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tolls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Daily Revenue</TableHead>
                <TableHead>Vehicles</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTolls.map((toll) => (
                <TableRow key={toll.id}>
                  <TableCell className="font-medium">{toll.id}</TableCell>
                  <TableCell>{toll.name}</TableCell>
                  <TableCell>{toll.location}</TableCell>
                  <TableCell>{toll.type}</TableCell>
                  <TableCell>${toll.rate.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(toll.status)}>
                      {toll.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-success font-semibold">${toll.dailyRevenue.toLocaleString()}</TableCell>
                  <TableCell>{toll.vehicles}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(toll)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(toll.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}