
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Check, X } from 'lucide-react';
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

interface EditingCell {
  id: string;
  field: keyof TravelEntry;
}

const EditableCell: React.FC<{
  value: string;
  isEditing: boolean;
  type?: 'text' | 'date';
  onEdit: () => void;
  onSave: (value: string) => void;
  onCancel: () => void;
}> = ({ value, isEditing, type = 'text', onEdit, onSave, onCancel }) => {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSave(editValue);
    } else if (e.key === 'Escape') {
      setEditValue(value);
      onCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1">
        <Input
          ref={inputRef}
          type={type}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => onSave(editValue)}
          className="h-8 min-w-[100px]"
        />
      </div>
    );
  }

  return (
    <div
      onClick={onEdit}
      className="cursor-pointer px-2 py-1 -mx-2 -my-1 rounded hover:bg-muted/80 transition-colors min-h-[28px] flex items-center"
      title="Click to edit"
    >
      {value || <span className="text-muted-foreground italic">Click to add</span>}
    </div>
  );
};

const TravelHistoryTable: React.FC<TravelHistoryTableProps> = ({ data, onUpdate }) => {
  const [travelEntries, setTravelEntries] = useState<TravelEntry[]>(
    data.travelHistory || []
  );
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
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

  const updateEntry = (id: string, field: keyof TravelEntry, value: string) => {
    const updatedEntries = travelEntries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    );
    setTravelEntries(updatedEntries);
    onUpdate({ ...data, travelHistory: updatedEntries });
    setEditingCell(null);
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

  const isEditingCell = (id: string, field: keyof TravelEntry) =>
    editingCell?.id === id && editingCell?.field === field;

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/30">
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
            <>
              <p className="text-sm text-muted-foreground">
                💡 Click any cell to edit it directly
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entry Date</TableHead>
                    <TableHead>Exit Date</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead className="w-[60px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {travelEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <EditableCell
                          value={entry.entryDate}
                          type="date"
                          isEditing={isEditingCell(entry.id, 'entryDate')}
                          onEdit={() => setEditingCell({ id: entry.id, field: 'entryDate' })}
                          onSave={(value) => updateEntry(entry.id, 'entryDate', value)}
                          onCancel={() => setEditingCell(null)}
                        />
                      </TableCell>
                      <TableCell>
                        <EditableCell
                          value={entry.exitDate}
                          type="date"
                          isEditing={isEditingCell(entry.id, 'exitDate')}
                          onEdit={() => setEditingCell({ id: entry.id, field: 'exitDate' })}
                          onSave={(value) => updateEntry(entry.id, 'exitDate', value)}
                          onCancel={() => setEditingCell(null)}
                        />
                      </TableCell>
                      <TableCell>
                        <EditableCell
                          value={entry.country}
                          isEditing={isEditingCell(entry.id, 'country')}
                          onEdit={() => setEditingCell({ id: entry.id, field: 'country' })}
                          onSave={(value) => updateEntry(entry.id, 'country', value)}
                          onCancel={() => setEditingCell(null)}
                        />
                      </TableCell>
                      <TableCell>
                        <EditableCell
                          value={entry.purpose}
                          isEditing={isEditingCell(entry.id, 'purpose')}
                          onEdit={() => setEditingCell({ id: entry.id, field: 'purpose' })}
                          onSave={(value) => updateEntry(entry.id, 'purpose', value)}
                          onCancel={() => setEditingCell(null)}
                        />
                      </TableCell>
                      <TableCell>
                        {entry.documentScanned ? (
                          <span className="text-green-600 text-sm">✓ Scanned</span>
                        ) : (
                          <span className="text-muted-foreground text-sm">Manual entry</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEntry(entry.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
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
