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
import { Search, Edit, Eye, Car, Users, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data
const vehiclesData = [
  { 
    id: "V001", 
    plateNumber: "ABC-123", 
    owner: "John Smith", 
    model: "Toyota Camry 2020", 
    status: "Active", 
    fines: 2, 
    totalFines: 325, 
    lastViolation: "2024-01-10",
    phone: "(555) 123-4567",
    address: "123 Main St, City"
  },
  { 
    id: "V002", 
    plateNumber: "XYZ-789", 
    owner: "Sarah Johnson", 
    model: "Honda Civic 2019", 
    status: "Suspended", 
    fines: 5, 
    totalFines: 750, 
    lastViolation: "2024-01-15",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, City"
  },
  { 
    id: "V003", 
    plateNumber: "DEF-456", 
    owner: "Mike Wilson", 
    model: "Ford F-150 2021", 
    status: "Active", 
    fines: 1, 
    totalFines: 150, 
    lastViolation: "2024-01-05",
    phone: "(555) 456-7890",
    address: "789 Pine St, City"
  },
  { 
    id: "V004", 
    plateNumber: "GHI-321", 
    owner: "Emily Davis", 
    model: "BMW X3 2022", 
    status: "Active", 
    fines: 0, 
    totalFines: 0, 
    lastViolation: "Never",
    phone: "(555) 321-6547",
    address: "321 Elm St, City"
  },
  { 
    id: "V005", 
    plateNumber: "JKL-654", 
    owner: "Robert Brown", 
    model: "Tesla Model 3 2023", 
    status: "Warning", 
    fines: 3, 
    totalFines: 450, 
    lastViolation: "2024-01-12",
    phone: "(555) 654-3210",
    address: "654 Maple Ave, City"
  },
];

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    owner: "",
    phone: "",
    address: "",
    status: ""
  });

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = () => {
    if (!selectedVehicle || !editData.owner || !editData.phone || !editData.address) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setVehicles(vehicles.map(vehicle => 
      vehicle.id === selectedVehicle.id 
        ? { 
            ...vehicle, 
            owner: editData.owner,
            phone: editData.phone,
            address: editData.address,
            status: editData.status as "Active" | "Suspended" | "Warning"
          }
        : vehicle
    ));
    
    setIsEditDialogOpen(false);
    setSelectedVehicle(null);
    toast({
      title: "Success",
      description: "Vehicle updated successfully",
    });
  };

  const openEditDialog = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setEditData({
      owner: vehicle.owner,
      phone: vehicle.phone,
      address: vehicle.address,
      status: vehicle.status
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "Warning":
        return "bg-warning text-warning-foreground";
      case "Suspended":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.status === "Active").length;
  const suspendedVehicles = vehicles.filter(v => v.status === "Suspended").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Vehicle Management</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Car className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{totalVehicles}</div>
                <div className="text-sm text-muted-foreground">Total Vehicles</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{activeVehicles}</div>
                <div className="text-sm text-muted-foreground">Active Vehicles</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{suspendedVehicles}</div>
                <div className="text-sm text-muted-foreground">Suspended</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-foreground">All Vehicles</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vehicles..."
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
                <TableHead>Plate Number</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Vehicle Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active Fines</TableHead>
                <TableHead>Total Fines</TableHead>
                <TableHead>Last Violation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.plateNumber}</TableCell>
                  <TableCell>{vehicle.owner}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {vehicle.fines > 0 ? (
                      <span className="text-destructive font-semibold">{vehicle.fines}</span>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {vehicle.totalFines > 0 ? (
                      <span className="font-semibold">${vehicle.totalFines}</span>
                    ) : (
                      <span className="text-muted-foreground">$0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.lastViolation}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openViewDialog(vehicle)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(vehicle)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Vehicle Information</DialogTitle>
          </DialogHeader>
          {selectedVehicle && (
            <div className="space-y-4">
              <div>
                <Label>Plate Number</Label>
                <Input value={selectedVehicle.plateNumber} disabled />
              </div>
              <div>
                <Label htmlFor="owner">Owner Name</Label>
                <Input
                  id="owner"
                  value={editData.owner}
                  onChange={(e) => setEditData({...editData, owner: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={editData.address}
                  onChange={(e) => setEditData({...editData, address: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={editData.status} onValueChange={(value) => setEditData({...editData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Warning">Warning</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUpdate} className="w-full bg-primary hover:bg-primary-hover">
                Update Vehicle
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vehicle Details</DialogTitle>
          </DialogHeader>
          {selectedVehicle && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Plate Number</Label>
                  <div className="font-semibold">{selectedVehicle.plateNumber}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div>
                    <Badge className={getStatusColor(selectedVehicle.status)}>
                      {selectedVehicle.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Owner</Label>
                  <div className="font-semibold">{selectedVehicle.owner}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <div>{selectedVehicle.phone}</div>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Address</Label>
                  <div>{selectedVehicle.address}</div>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Vehicle Model</Label>
                  <div className="font-semibold">{selectedVehicle.model}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Active Fines</Label>
                  <div className={selectedVehicle.fines > 0 ? "text-destructive font-semibold" : ""}>
                    {selectedVehicle.fines}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Total Fine Amount</Label>
                  <div className="font-semibold">${selectedVehicle.totalFines}</div>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Last Violation</Label>
                  <div>{selectedVehicle.lastViolation}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}