import { useState, useEffect } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useIsCallerAdmin } from '@/hooks/useAuthz';
import { useGetAllContentItems, useSeedInitialContent, useCreateContentItem, useUpdateContentItem, useDeleteContentItem } from '@/hooks/useContentItems';
import { useGetMainHauntSchedule, useUpdateMainHauntSchedule } from '@/hooks/useMainHauntSchedule';
import { AccessDeniedScreen } from '@/components/auth/AccessDeniedScreen';
import { LoginButton } from '@/components/auth/LoginButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Plus, Edit, Trash2, Calendar, AlertCircle, Database } from 'lucide-react';
import { toast } from 'sonner';
import { formatDate, formatDateRange, formatContentType, getTypeSpecificFieldsSummary } from '@/lib/contentFormatting';
import { ContentItem, EventDateRange, Date_, ContentType, EventType, ScareLevel, ZoneLocation, AgeRestriction, PerformanceType } from '../backend';

type ContentItemForm = Omit<ContentItem, 'id'>;

export function CmsPage() {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: contentItems = [], isLoading: itemsLoading, error: itemsError } = useGetAllContentItems();
  const { data: mainSchedule = [], isLoading: scheduleLoading } = useGetMainHauntSchedule();
  const seedMutation = useSeedInitialContent();
  const createMutation = useCreateContentItem();
  const updateMutation = useUpdateContentItem();
  const deleteMutation = useDeleteContentItem();
  const updateScheduleMutation = useUpdateMainHauntSchedule();

  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const isAuthenticated = !!identity;
  const isAuthorized = isAuthenticated && isAdmin === true;

  useEffect(() => {
    if (isAuthenticated && isAdmin && contentItems.length === 0 && !itemsLoading) {
      handleSeedContent();
    }
  }, [isAuthenticated, isAdmin, contentItems.length, itemsLoading]);

  const handleSeedContent = async () => {
    try {
      await seedMutation.mutateAsync();
      toast.success('Initial content seeded successfully!');
    } catch (error: any) {
      console.error('Seed error:', error);
      toast.error('Failed to seed content: ' + (error.message || 'Unknown error'));
    }
  };

  const handleCreateItem = async (item: ContentItemForm) => {
    try {
      await createMutation.mutateAsync({ ...item, id: 0n });
      toast.success('Content item created successfully!');
      setIsCreateDialogOpen(false);
    } catch (error: any) {
      console.error('Create error:', error);
      toast.error('Failed to create item: ' + (error.message || 'Unknown error'));
    }
  };

  const handleUpdateItem = async (id: bigint, item: ContentItemForm) => {
    try {
      await updateMutation.mutateAsync({ id, item: { ...item, id } });
      toast.success('Content item updated successfully!');
      setEditingItem(null);
    } catch (error: any) {
      console.error('Update error:', error);
      toast.error('Failed to update item: ' + (error.message || 'Unknown error'));
    }
  };

  const handleDeleteItem = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Content item deleted successfully!');
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error('Failed to delete item: ' + (error.message || 'Unknown error'));
    }
  };

  const handleUpdateSchedule = async (newSchedule: EventDateRange[]) => {
    try {
      await updateScheduleMutation.mutateAsync(newSchedule);
      toast.success('Main haunt schedule updated successfully!');
      setIsScheduleDialogOpen(false);
    } catch (error: any) {
      console.error('Schedule update error:', error);
      toast.error('Failed to update schedule: ' + (error.message || 'Unknown error'));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto border-destructive/50">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive">Login Required</CardTitle>
            <CardDescription>
              You must be logged in to access the Content Management System.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAdminLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-destructive" />
      </div>
    );
  }

  if (!isAuthorized) {
    return <AccessDeniedScreen />;
  }

  const filteredItems = activeTab === 'all' 
    ? contentItems 
    : contentItems.filter(item => {
        if (activeTab === 'events') return 'event' in item.customType;
        if (activeTab === 'scareZones') return 'scareZone' in item.customType;
        if (activeTab === 'shows') return 'show' in item.customType;
        if (activeTab === 'attractions') return 'attraction' in item.customType;
        return false;
      });

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-destructive bloody-text mb-2">Content Management System</h1>
            <p className="text-muted-foreground">Manage events, scare zones, shows, and attractions</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsScheduleDialogOpen(true)}
              variant="outline"
              className="border-destructive/50 hover:bg-destructive/10"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Main Schedule
            </Button>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-destructive hover:bg-destructive/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </div>
        </div>

        {itemsError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load content items. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        )}

        {itemsLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-destructive" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all">All ({contentItems.length})</TabsTrigger>
              <TabsTrigger value="events">Events ({contentItems.filter(i => 'event' in i.customType).length})</TabsTrigger>
              <TabsTrigger value="scareZones">Scare Zones ({contentItems.filter(i => 'scareZone' in i.customType).length})</TabsTrigger>
              <TabsTrigger value="shows">Shows ({contentItems.filter(i => 'show' in i.customType).length})</TabsTrigger>
              <TabsTrigger value="attractions">Attractions ({contentItems.filter(i => 'attraction' in i.customType).length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>Content Items</CardTitle>
                  <CardDescription>
                    {activeTab === 'all' ? 'All content items' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} only`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredItems.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No items found. Create your first item to get started.</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Schedule</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => (
                          <TableRow key={item.id.toString()}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{formatContentType(item.customType)}</TableCell>
                            <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                            <TableCell className="text-sm">
                              {item.useMainHauntSchedule ? (
                                <span className="text-muted-foreground">Inherits main schedule</span>
                              ) : (
                                item.dates.map((range, idx) => (
                                  <div key={idx}>{formatDateRange(range)}</div>
                                ))
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingItem(item)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteItem(item.id)}
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
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        <ContentItemDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSave={handleCreateItem}
          title="Create Content Item"
        />

        {editingItem && (
          <ContentItemDialog
            open={!!editingItem}
            onOpenChange={(open) => !open && setEditingItem(null)}
            onSave={(item) => handleUpdateItem(editingItem.id, item)}
            initialItem={editingItem}
            title="Edit Content Item"
          />
        )}

        <ScheduleDialog
          open={isScheduleDialogOpen}
          onOpenChange={setIsScheduleDialogOpen}
          onSave={handleUpdateSchedule}
          initialSchedule={mainSchedule}
        />
      </div>
    </div>
  );
}

function ContentItemDialog({
  open,
  onOpenChange,
  onSave,
  initialItem,
  title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: ContentItemForm) => void;
  initialItem?: ContentItem;
  title: string;
}) {
  const [name, setName] = useState(initialItem?.name || '');
  const [description, setDescription] = useState(initialItem?.description || '');
  const [contentTypeKey, setContentTypeKey] = useState<'event' | 'scareZone' | 'show' | 'attraction'>(
    initialItem ? (
      'event' in initialItem.customType ? 'event' :
      'scareZone' in initialItem.customType ? 'scareZone' :
      'show' in initialItem.customType ? 'show' : 'attraction'
    ) : 'event'
  );
  const [useMainSchedule, setUseMainSchedule] = useState(initialItem?.useMainHauntSchedule ?? true);
  const [dateRanges, setDateRanges] = useState<EventDateRange[]>(
    initialItem?.dates.length ? initialItem.dates : [
      {
        startDate: { year: 2024n, month: 9n, day: 15n },
        endDate: { year: 2024n, month: 11n, day: 1n },
      }
    ]
  );

  const [eventType, setEventType] = useState<EventType>(
    initialItem && 'event' in initialItem.customType ? initialItem.customType.event.eventType : EventType.seasonal
  );
  const [scareLevel, setScareLevel] = useState<ScareLevel>(
    initialItem && 'scareZone' in initialItem.customType ? initialItem.customType.scareZone.scareLevel : ScareLevel.moderate
  );
  const [zoneLocation, setZoneLocation] = useState<ZoneLocation>(
    initialItem && 'scareZone' in initialItem.customType ? initialItem.customType.scareZone.indoorOutdoor : ZoneLocation.outdoor
  );
  const [performanceType, setPerformanceType] = useState<PerformanceType>(
    initialItem && 'show' in initialItem.customType ? initialItem.customType.show.performanceType : PerformanceType.theatrical
  );
  const [ageRestriction, setAgeRestriction] = useState<AgeRestriction>(
    initialItem && 'attraction' in initialItem.customType ? initialItem.customType.attraction.ageRestriction : AgeRestriction.none
  );
  const [hasGuidedTour, setHasGuidedTour] = useState(
    initialItem && 'attraction' in initialItem.customType ? initialItem.customType.attraction.hasGuidedTour : false
  );
  const [yearIntroduced, setYearIntroduced] = useState<string>(
    initialItem && 'scareZone' in initialItem.customType && initialItem.customType.scareZone.yearIntroduced
      ? initialItem.customType.scareZone.yearIntroduced.toString()
      : initialItem && 'show' in initialItem.customType && initialItem.customType.show.yearIntroduced
      ? initialItem.customType.show.yearIntroduced.toString()
      : initialItem && 'attraction' in initialItem.customType && initialItem.customType.attraction.yearIntroduced
      ? initialItem.customType.attraction.yearIntroduced.toString()
      : ''
  );

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      toast.error('Name and description are required');
      return;
    }

    let customType: ContentType;
    if (contentTypeKey === 'event') {
      customType = { __kind__: 'event', event: { eventType } };
    } else if (contentTypeKey === 'scareZone') {
      customType = {
        __kind__: 'scareZone',
        scareZone: {
          scareLevel,
          indoorOutdoor: zoneLocation,
          yearIntroduced: yearIntroduced ? BigInt(yearIntroduced) : undefined,
        }
      };
    } else if (contentTypeKey === 'show') {
      customType = {
        __kind__: 'show',
        show: {
          performanceType,
          yearIntroduced: yearIntroduced ? BigInt(yearIntroduced) : undefined,
        }
      };
    } else {
      customType = {
        __kind__: 'attraction',
        attraction: {
          ageRestriction,
          hasGuidedTour,
          yearIntroduced: yearIntroduced ? BigInt(yearIntroduced) : undefined,
        }
      };
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      customType,
      useMainHauntSchedule: useMainSchedule,
      dates: dateRanges,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-destructive">{title}</DialogTitle>
          <DialogDescription>
            Fill in the details for the content item.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contentType">Content Type</Label>
            <Select value={contentTypeKey} onValueChange={(v: any) => setContentTypeKey(v)}>
              <SelectTrigger id="contentType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="scareZone">Scare Zone</SelectItem>
                <SelectItem value="show">Show</SelectItem>
                <SelectItem value="attraction">Attraction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {contentTypeKey === 'event' && (
            <div className="grid gap-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Select value={eventType} onValueChange={(v: EventType) => setEventType(v)}>
                <SelectTrigger id="eventType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EventType.seasonal}>Seasonal</SelectItem>
                  <SelectItem value={EventType.special}>Special</SelectItem>
                  <SelectItem value={EventType.holiday}>Holiday</SelectItem>
                  <SelectItem value={EventType.specialEvent}>Special Event</SelectItem>
                  <SelectItem value={EventType.convention}>Convention</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {contentTypeKey === 'scareZone' && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="scareLevel">Scare Level</Label>
                <Select value={scareLevel} onValueChange={(v: ScareLevel) => setScareLevel(v)}>
                  <SelectTrigger id="scareLevel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ScareLevel.mild}>Mild</SelectItem>
                    <SelectItem value={ScareLevel.moderate}>Moderate</SelectItem>
                    <SelectItem value={ScareLevel.extreme}>Extreme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zoneLocation">Location</Label>
                <Select value={zoneLocation} onValueChange={(v: ZoneLocation) => setZoneLocation(v)}>
                  <SelectTrigger id="zoneLocation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ZoneLocation.indoor}>Indoor</SelectItem>
                    <SelectItem value={ZoneLocation.outdoor}>Outdoor</SelectItem>
                    <SelectItem value={ZoneLocation.both}>Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="yearIntroduced">Year Introduced (optional)</Label>
                <Input
                  id="yearIntroduced"
                  type="number"
                  value={yearIntroduced}
                  onChange={(e) => setYearIntroduced(e.target.value)}
                  placeholder="e.g., 2023"
                />
              </div>
            </>
          )}

          {contentTypeKey === 'show' && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="performanceType">Performance Type</Label>
                <Select value={performanceType} onValueChange={(v: PerformanceType) => setPerformanceType(v)}>
                  <SelectTrigger id="performanceType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PerformanceType.musical}>Musical</SelectItem>
                    <SelectItem value={PerformanceType.theatrical}>Theatrical</SelectItem>
                    <SelectItem value={PerformanceType.dance}>Dance</SelectItem>
                    <SelectItem value={PerformanceType.interactive}>Interactive</SelectItem>
                    <SelectItem value={PerformanceType.stunt}>Stunt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="yearIntroduced">Year Introduced (optional)</Label>
                <Input
                  id="yearIntroduced"
                  type="number"
                  value={yearIntroduced}
                  onChange={(e) => setYearIntroduced(e.target.value)}
                  placeholder="e.g., 2027"
                />
              </div>
            </>
          )}

          {contentTypeKey === 'attraction' && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="ageRestriction">Age Restriction</Label>
                <Select value={ageRestriction} onValueChange={(v: AgeRestriction) => setAgeRestriction(v)}>
                  <SelectTrigger id="ageRestriction">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={AgeRestriction.none}>None</SelectItem>
                    <SelectItem value={AgeRestriction.kids}>Kids</SelectItem>
                    <SelectItem value={AgeRestriction.teens}>Teens</SelectItem>
                    <SelectItem value={AgeRestriction.adultsOnly}>Adults Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="hasGuidedTour"
                  checked={hasGuidedTour}
                  onCheckedChange={setHasGuidedTour}
                />
                <Label htmlFor="hasGuidedTour">Has Guided Tour</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="yearIntroduced">Year Introduced (optional)</Label>
                <Input
                  id="yearIntroduced"
                  type="number"
                  value={yearIntroduced}
                  onChange={(e) => setYearIntroduced(e.target.value)}
                  placeholder="e.g., 2022"
                />
              </div>
            </>
          )}

          <Separator />

          <div className="flex items-center space-x-2">
            <Switch
              id="useMainSchedule"
              checked={useMainSchedule}
              onCheckedChange={setUseMainSchedule}
            />
            <Label htmlFor="useMainSchedule">Use Main Haunt Schedule</Label>
          </div>

          {!useMainSchedule && (
            <div className="grid gap-2">
              <Label>Custom Date Range</Label>
              {dateRanges.map((range, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Start Date</Label>
                    <Input
                      type="date"
                      value={`${range.startDate.year}-${String(range.startDate.month).padStart(2, '0')}-${String(range.startDate.day).padStart(2, '0')}`}
                      onChange={(e) => {
                        const [year, month, day] = e.target.value.split('-').map(Number);
                        const newRanges = [...dateRanges];
                        newRanges[idx] = {
                          ...newRanges[idx],
                          startDate: { year: BigInt(year), month: BigInt(month), day: BigInt(day) }
                        };
                        setDateRanges(newRanges);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">End Date</Label>
                    <Input
                      type="date"
                      value={`${range.endDate.year}-${String(range.endDate.month).padStart(2, '0')}-${String(range.endDate.day).padStart(2, '0')}`}
                      onChange={(e) => {
                        const [year, month, day] = e.target.value.split('-').map(Number);
                        const newRanges = [...dateRanges];
                        newRanges[idx] = {
                          ...newRanges[idx],
                          endDate: { year: BigInt(year), month: BigInt(month), day: BigInt(day) }
                        };
                        setDateRanges(newRanges);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-destructive hover:bg-destructive/90">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ScheduleDialog({
  open,
  onOpenChange,
  onSave,
  initialSchedule,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (schedule: EventDateRange[]) => void;
  initialSchedule: EventDateRange[];
}) {
  const [schedule, setSchedule] = useState<EventDateRange[]>(
    initialSchedule.length ? initialSchedule : [
      {
        startDate: { year: 2024n, month: 9n, day: 15n },
        endDate: { year: 2024n, month: 11n, day: 1n },
      }
    ]
  );

  const handleSave = () => {
    onSave(schedule);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-destructive">Main Haunt Schedule</DialogTitle>
          <DialogDescription>
            Set the default operating schedule. Items that inherit this schedule will automatically update when you change it.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {schedule.map((range, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={`${range.startDate.year}-${String(range.startDate.month).padStart(2, '0')}-${String(range.startDate.day).padStart(2, '0')}`}
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split('-').map(Number);
                    const newSchedule = [...schedule];
                    newSchedule[idx] = {
                      ...newSchedule[idx],
                      startDate: { year: BigInt(year), month: BigInt(month), day: BigInt(day) }
                    };
                    setSchedule(newSchedule);
                  }}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={`${range.endDate.year}-${String(range.endDate.month).padStart(2, '0')}-${String(range.endDate.day).padStart(2, '0')}`}
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split('-').map(Number);
                    const newSchedule = [...schedule];
                    newSchedule[idx] = {
                      ...newSchedule[idx],
                      endDate: { year: BigInt(year), month: BigInt(month), day: BigInt(day) }
                    };
                    setSchedule(newSchedule);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-destructive hover:bg-destructive/90">
            Update Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
