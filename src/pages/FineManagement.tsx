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
import { Plus, Search, Trash2, Eye, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data - replace with real data
const finesData = [
  { id: "F001", vehicleNumber: "ABC-123", violationType: "Speeding", amount: 150, status: "Pending", date: "2024-01-15", location: "Highway 101" },
  { id: "F002", vehicleNumber: "XYZ-789", violationType: "Parking", amount: 75, status: "Paid", date: "2024-01-14", location: "Downtown" },
  { id: "F003", vehicleNumber: "DEF-456", violationType: "Red Light", amount: 200, status: "Pending", date: "2024-01-13", location: "Main St & 1st" },
  { id: "F004", vehicleNumber: "GHI-321", violationType: "No Seat Belt", amount: 100, status: "Paid", date: "2024-01-12", location: "Park Ave" },
  { id: "F005", vehicleNumber: "JKL-654", violationType: "Speeding", amount: 175, status: "Overdue", date: "2024-01-10", location: "Highway 205" },
];

export default function FineManagement() {
  const [fines, setFines] = useState(finesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newFine, setNewFine] = useState({
    vehicleNumber: "",
    violationType: "",
    amount: "",
    location: ""
  });

  const filteredFines = fines.filter(fine =>
    fine.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fine.violationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fine.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFine = () => {
    if (!newFine.vehicleNumber || !newFine.violationType || !newFine.amount || !newFine.location) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const fine = {
      id: `F${String(fines.length + 1).padStart(3, '0')}`,
      vehicleNumber: newFine.vehicleNumber,
      violationType: newFine.violationType,
      amount: parseInt(newFine.amount),
      status: "Pending" as const,
      date: new Date().toISOString().split('T')[0],
      location: newFine.location
    };

    setFines([...fines, fine]);
    setNewFine({ vehicleNumber: "", violationType: "", amount: "", location: "" });
    setIsAddDialogOpen(false);
    toast({
      title: "Success",
      description: "Fine added successfully",
    });
  };

  const handleDeleteFine = (id: string) => {
    setFines(fines.filter(fine => fine.id !== id));
    toast({
      title: "Success",
      description: "Fine deleted successfully",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success text-success-foreground";
      case "Pending":
        return "bg-warning text-warning-foreground";
      case "Overdue":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Fine Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              Add Fine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Fine</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="vehicle">Vehicle Number</Label>
                <Input
                  id="vehicle"
                  value={newFine.vehicleNumber}
                  onChange={(e) => setNewFine({...newFine, vehicleNumber: e.target.value})}
                  placeholder="e.g., ABC-123"
                />
              </div>
              <div>
                <Label htmlFor="violation">Violation Type</Label>
                <Select onValueChange={(value) => setNewFine({...newFine, violationType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select violation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Speeding">Speeding</SelectItem>
                    <SelectItem value="Parking">Illegal Parking</SelectItem>
                    <SelectItem value="Red Light">Red Light Violation</SelectItem>
                    <SelectItem value="No Seat Belt">No Seat Belt</SelectItem>
                    <SelectItem value="Lane Violation">Lane Violation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Fine Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newFine.amount}
                  onChange={(e) => setNewFine({...newFine, amount: e.target.value})}
                  placeholder="e.g., 150"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newFine.location}
                  onChange={(e) => setNewFine({...newFine, location: e.target.value})}
                  placeholder="e.g., Highway 101"
                />
              </div>
              <Button onClick={handleAddFine} className="w-full bg-primary hover:bg-primary-hover">
                Add Fine
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-foreground">All Fines</CardTitle>
          <div className="flex space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search fines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fine ID</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Violation</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFines.map((fine) => (
                <TableRow key={fine.id}>
                  <TableCell className="font-medium">{fine.id}</TableCell>
                  <TableCell>{fine.vehicleNumber}</TableCell>
                  <TableCell>{fine.violationType}</TableCell>
                  <TableCell>${fine.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(fine.status)}>
                      {fine.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{fine.date}</TableCell>
                  <TableCell>{fine.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteFine(fine.id)}
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