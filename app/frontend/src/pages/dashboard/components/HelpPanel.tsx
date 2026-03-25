import {
  LifeBuoy,
  MessageCircle,
  Mail,
  BookOpenCheck,
  PhoneCall,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface HelpPanelProps {
  onStartChat?: () => void;
  onSendEmail?: () => void;
}

const RESOURCE_LINKS = [
  {
    title: 'Starter Guide',
    description:
      'Step-by-step walkthrough of lists, automations, and alerts.',
    actionLabel: 'Read guide',
    icon: BookOpenCheck,
  },
  {
    title: 'Best Practices',
    description:
      'Tips for organizing shared grocery plans with families.',
    actionLabel: 'View playbook',
    icon: LifeBuoy,
  },
  {
    title: 'Release Notes',
    description:
      'See what changed in the latest Donezo update.',
    actionLabel: 'Browse notes',
    icon: MessageCircle,
  },
];

export function HelpPanel({
  onStartChat,
  onSendEmail,
}: HelpPanelProps) {
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-xl">
            Need some help?
          </CardTitle>
          <CardDescription>
            We are online every day from 7am to
            7pm PT. Pick a channel and we will
            reply within minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button
            className="flex-1 bg-emerald-600 hover:bg-emerald-500"
            onClick={onStartChat}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Start live chat
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={onSendEmail}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email support
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Quick answers
          </CardTitle>
          <CardDescription>
            Browse popular resources curated for
            household planning teams.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {RESOURCE_LINKS.map((resource) => (
            <div
              key={resource.title}
              className="rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              <resource.icon className="mb-3 h-5 w-5 text-emerald-600" />
              <p className="text-sm font-semibold text-slate-900">
                {resource.title}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {resource.description}
              </p>
              <button
                type="button"
                className="mt-3 text-sm font-semibold text-emerald-700"
              >
                {resource.actionLabel}
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Talk to a specialist
          </CardTitle>
          <CardDescription>
            Schedule a session with our grocery
            planning experts for tailored
            workflows.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <PhoneCall className="h-4 w-4 text-emerald-600" />
            +1 (415) 555-0110
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <LifeBuoy className="h-4 w-4 text-emerald-600" />
            Support hours: Mon-Sun · 7a-7p PT
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
