import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: string;
}

export function UpgradeModal({ open, onOpenChange, feature = "this feature" }: UpgradeModalProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onOpenChange(false);
    navigate('/upgrade');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm border-primary-blue/20">
        <DialogHeader className="text-center pt-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 flex items-center justify-center mx-auto mb-4 ring-1 ring-primary-blue/20">
            <Crown className="h-6 w-6 text-primary-blue" />
          </div>
          <DialogTitle className="text-xl">Upgrade to Continue</DialogTitle>
          <DialogDescription className="text-center pt-2 text-muted-foreground">
            Unlock {feature} with Premium and continue your Express Entry journey.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2.5 pt-4">
          <Button 
            onClick={handleUpgrade} 
            className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white border-0 shadow-lg shadow-primary-blue/20"
          >
            Upgrade to Premium
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}