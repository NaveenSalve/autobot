import { stages, usePipelineStore } from '../stores/pipelineStore';
import { formatCurrency } from '../lib/utils';
export function KanbanBoard() {
  const { deals, moveDeal } = usePipelineStore();
  return <div className="grid gap-4 overflow-x-auto pb-3 md:grid-cols-3 xl:grid-cols-6">{stages.map(stage => <div key={stage} onDragOver={e => e.preventDefault()} onDrop={e => moveDeal(e.dataTransfer.getData('deal'), stage)} className="min-h-[420px] min-w-64 rounded-2xl border border-border bg-surface p-3"><div className="mb-3 flex items-center justify-between"><h3 className="font-semibold">{stage}</h3><span className="rounded-full bg-bg2 px-2 py-1 text-xs text-muted">{deals.filter(d=>d.stage===stage).length}</span></div>{deals.filter(d=>d.stage===stage).map(deal => <div key={deal.id} draggable onDragStart={e => e.dataTransfer.setData('deal', deal.id)} className="mb-3 cursor-grab rounded-xl border border-border bg-bg2 p-3 active:cursor-grabbing"><div className="font-medium">{deal.name}</div><div className="mt-2 font-mono text-sm text-accent">{formatCurrency(deal.value)}</div><div className="mt-1 text-xs text-muted">Follow-up {deal.nextFollowUp}</div></div>)}</div>)}</div>;
}
