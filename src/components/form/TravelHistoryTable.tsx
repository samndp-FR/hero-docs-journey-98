
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, FileCheck, Pencil, Check, X, Plane } from 'lucide-react';
import I94ScanPrompt from './I94ScanPrompt';
import { cn } from '@/lib/utils';

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

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France", "Australia",
  "Japan", "China", "India", "Mexico", "Brazil", "Italy", "Spain", "Netherlands",
  "Switzerland", "Sweden", "Norway", "Denmark", "Belgium", "Austria", "Other"
];

const purposes = [
  "Tourism", "Business", "Work", "Study", "Family Visit", "Transit", "Other"
];

const TravelHistoryTable: React.FC<TravelHistoryTableProps> = ({ data, onUpdate }) => {
  const [travelEntries, setTravelEntries] = useState<TravelEntry[]>(
    data.travelHistory || []
  );
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [newEntry, setNewEntry] = useState<Partial<TravelEntry>>({});
  const [showAddForm, setShowAddForm] = useState(false);

  // Check if user has any US travel entries
  const hasUSTravel = travelEntries.some(entry => 
    entry.country?.toLowerCase().includes('united states') || 
    entry.country?.toLowerCase() === 'usa' ||
    entry.country?.toLowerCase() === 'us'
  );

  const addTravelEntry = () => {
    if (!newEntry.country || !newEntry.entryDate) return;
    
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
    setShowAddForm(false);
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

  const handleI94Scanned = (scannedData: any) => {
    const entry: TravelEntry = {
      id: Date.now().toString(),
      entryDate: scannedData.entryDate || '',
      exitDate: scannedData.exitDate || '',
      country: 'United States',
      purpose: scannedData.purpose || 'Tourist/Business',
      documentScanned: true
    };
    
    const updatedEntries = [...travelEntries, entry];
    setTravelEntries(updatedEntries);
    onUpdate({ ...data, travelHistory: updatedEntries });
  };

  const isEditingCell = (id: string, field: keyof TravelEntry) =>
    editingCell?.id === id && editingCell?.field === field;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* I-94 Feature Prompt - Prominent placement */}
      <I94ScanPrompt 
        onDocumentScanned={handleI94Scanned}
        hasUSTravel={hasUSTravel}
      />

      {/* Main Card */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm bg-[hsl(var(--section-travel-bg))]">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <div className="flex items-start gap-3 pb-4 mb-0 border-b border-[hsl(var(--section-divider))]">
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Travel History</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    List all countries you've visited in the past 10 years
                  </p>
                </div>
                <Button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  variant={showAddForm ? "secondary" : "default"}
                  size="sm"
                  className="gap-2 shrink-0"
                >
                  {showAddForm ? (
                    <>
                      <X className="w-4 h-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Trip
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="px-6 pb-6 pt-2">
          <div className="space-y-5">
            {/* Add New Entry Form */}
            {showAddForm && (
              <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5 space-y-4">
                <h4 className="font-medium text-sm">Add New Travel Entry</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      value={newEntry.country || ''}
                      onValueChange={(value) => setNewEntry({ ...newEntry, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="entry-date">Arrival Date *</Label>
                    <Input
                      id="entry-date"
                      type="date"
                      value={newEntry.entryDate || ''}
                      onChange={(e) => setNewEntry({ ...newEntry, entryDate: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="exit-date">Departure Date</Label>
                    <Input
                      id="exit-date"
                      type="date"
                      value={newEntry.exitDate || ''}
                      onChange={(e) => setNewEntry({ ...newEntry, exitDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="purpose">Purpose</Label>
                    <Select
                      value={newEntry.purpose || ''}
                      onValueChange={(value) => setNewEntry({ ...newEntry, purpose: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        {purposes.map(purpose => (
                          <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={addTravelEntry} className="gap-2" disabled={!newEntry.country || !newEntry.entryDate}>
                    <Plus className="w-4 h-4" />
                    Add Travel Entry
                  </Button>
                </div>
              </div>
            )}

            {/* Travel History Table */}
            {travelEntries.length > 0 && (
              <>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3">
                  <Pencil className="w-3 h-3" />
                  Click any cell to edit it directly
                </p>
                <div className="border border-[hsl(var(--section-divider))] rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[hsl(var(--section-header-bg))]">
                        <TableHead className="font-semibold text-xs uppercase tracking-wide">Country</TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wide">Arrival</TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wide">Departure</TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wide">Purpose</TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wide">Source</TableHead>
                        <TableHead className="w-[60px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {travelEntries.map((entry, index) => (
                        <TableRow 
                          key={entry.id}
                          className={index % 2 === 0 ? 'bg-white' : 'bg-[hsl(var(--table-stripe))]'}
                        >
                          <TableCell className="font-medium">
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
                              value={entry.purpose}
                              isEditing={isEditingCell(entry.id, 'purpose')}
                              onEdit={() => setEditingCell({ id: entry.id, field: 'purpose' })}
                              onSave={(value) => updateEntry(entry.id, 'purpose', value)}
                              onCancel={() => setEditingCell(null)}
                            />
                          </TableCell>
                          <TableCell>
                            {entry.documentScanned ? (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-[hsl(var(--success))] bg-[hsl(var(--success-muted))] px-2 py-1 rounded-full">
                                <FileCheck className="w-3 h-3" />
                                I-94 Scanned
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                <Pencil className="w-3 h-3" />
                                Manual
                              </span>
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
                </div>
              </>
            )}
            
            {travelEntries.length === 0 && !showAddForm && (
              <div className="text-center py-14 border-2 border-dashed rounded-xl bg-white/60">
                <p className="text-muted-foreground mb-4">
                  No travel history entries yet
                </p>
                <Button onClick={() => setShowAddForm(true)} variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add your first trip
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelHistoryTable;
