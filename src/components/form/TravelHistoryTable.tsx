
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit } from 'lucide-react';
import DocumentScanner from './DocumentScanner';

interface TravelEntry {
  id: string;
  entryDate: string;
  exitDate: string;
  country: string;
  purpose: string;
  documentScanned?: boolean;
}

interface TravelHistoryTableProps {
  data: any;
  onUpdate: (data: any) => void;
}

const TravelHistoryTable: React.FC<TravelHistoryTableProps> = ({ data, onUpdate }) => {
  const [travelEntries, setTravelEntries] = useState<TravelEntry[]>(
    data.travelHistory || []
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState<Partial<TravelEntry>>({});

  const addTravelEntry = () => {
    const entry: TravelEntry = {
      id: Date.now().toString(),
      entryDate: newEntry.entryDate || '',
      exitDate: newEntry.exitDate || '',
      country: newEntry.country || '',
      purpose: newEntry.purpose || '',
      documentScanned: false
    };
    
    const updatedEntries = [...travelEntries, entry];
    setTravelEntries(updatedEntries);
    onUpdate({ ...data, travelHistory: updatedEntries });
    setNewEntry({});
  };

  const removeEntry = (id: string) => {
    const updatedEntries = travelEntries.filter(entry => entry.id !== id);
    setTravelEntries(updatedEntries);
    onUpdate({ ...data, travelHistory: updatedEntries });
  };

  const handleDocumentScanned = (scannedData: any) => {
    const entry: TravelEntry = {
      id: Date.now().toString(),
      entryDate: scannedData.entryDate || '',
      exitDate: scannedData.exitDate || '',
      country: 'United States',
      purpose: 'Tourist/Business',
      documentScanned: true
    };
    
    const updatedEntries = [...travelEntries, entry];
    setTravelEntries(updatedEntries);
    onUpdate({ ...data, travelHistory: updatedEntries });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Travel History (Last 5 Years)</CardTitle>
          <DocumentScanner 
            documentType="I-94"
            onDocumentScanned={handleDocumentScanned}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Add New Entry Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-gray-50">
            <div>
              <Label htmlFor="entry-date">Entry Date</Label>
              <Input
                id="entry-date"
                type="date"
                value={newEntry.entryDate || ''}
                onChange={(e) => setNewEntry({ ...newEntry, entryDate: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="exit-date">Exit Date</Label>
              <Input
                id="exit-date"
                type="date"
                value={newEntry.exitDate || ''}
                onChange={(e) => setNewEntry({ ...newEntry, exitDate: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={newEntry.country || ''}
                onChange={(e) => setNewEntry({ ...newEntry, country: e.target.value })}
                placeholder="Enter country"
              />
            </div>
            
            <div className="flex items-end">
              <Button onClick={addTravelEntry} className="w-full flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Entry</span>
              </Button>
            </div>
          </div>

          {/* Travel History Table */}
          {travelEntries.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entry Date</TableHead>
                  <TableHead>Exit Date</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {travelEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.entryDate}</TableCell>
                    <TableCell>{entry.exitDate}</TableCell>
                    <TableCell>{entry.country}</TableCell>
                    <TableCell>{entry.purpose}</TableCell>
                    <TableCell>
                      {entry.documentScanned ? (
                        <span className="text-green-600 text-sm">✓ Scanned</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Manual entry</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeEntry(entry.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {travelEntries.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No travel history entries yet. Add one manually or scan an I-94 document.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelHistoryTable;
