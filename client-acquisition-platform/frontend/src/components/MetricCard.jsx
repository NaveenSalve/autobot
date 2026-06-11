import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/Card';
export function MetricCard({ label, value, icon: Icon, delta }) {
  return <Card><CardContent><div className="flex items-start justify-between"><div><p className="text-sm text-muted">{label}</p><motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="mt-2 text-2xl font-bold font-mono">{value}</motion.div>{delta && <p className="mt-2 text-xs text-green-400">{delta}</p>}</div>{Icon && <div className="rounded-xl bg-accent/10 p-2 text-accent"><Icon size={20}/></div>}</div></CardContent></Card>;
}
