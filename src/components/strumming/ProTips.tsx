import { Info } from 'lucide-react';

interface ProTip {
  text: string;
}

interface ProTipsProps {
  tips: ProTip[];
}

export const ProTips = ({ tips }: ProTipsProps) => (
  <div className="bg-surface-container p-6 sm:p-8 rounded-3xl lg:sticky lg:top-24">
    <h4 className="font-headline text-xl font-bold mb-6">Pro Tips</h4>
    <div className="space-y-6">
      {tips.map((tip, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
            <Info size={16} />
          </div>
          <p className="text-sm font-body text-on-surface-variant">{tip.text}</p>
        </div>
      ))}
    </div>
  </div>
);