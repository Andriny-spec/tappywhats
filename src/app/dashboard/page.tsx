'use client';

import { Card } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare,
  DollarSign, 
  RefreshCcw,
  TrendingUp,
  Bot,
  Clock
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const data = [
  { name: 'Jan', mensagens: 4000, conversoes: 2400, vendas: 2400 },
  { name: 'Fev', mensagens: 3000, conversoes: 1398, vendas: 2210 },
  { name: 'Mar', mensagens: 2000, conversoes: 9800, vendas: 2290 },
  { name: 'Abr', mensagens: 2780, conversoes: 3908, vendas: 2000 },
  { name: 'Mai', mensagens: 1890, conversoes: 4800, vendas: 2181 },
  { name: 'Jun', mensagens: 2390, conversoes: 3800, vendas: 2500 },
  { name: 'Jul', mensagens: 3490, conversoes: 4300, vendas: 2100 },
];

const metrics = [
  {
    title: 'Total de Mensagens',
    value: '48.271',
    change: '+23%',
    icon: MessageSquare,
    color: 'text-[#25D366]'
  },
  {
    title: 'Conversões',
    value: '1.234',
    change: '+14%',
    icon: Users,
    color: 'text-blue-500'
  },
  {
    title: 'Automações Ativas',
    value: '15',
    change: '+5',
    icon: Bot,
    color: 'text-purple-500'
  },
  {
    title: 'Tempo Médio',
    value: '2min',
    change: '-30s',
    icon: Clock,
    color: 'text-orange-500'
  },
  {
    title: 'Vendas via WhatsApp',
    value: 'R$ 22.360',
    change: '+21%',
    icon: TrendingUp,
    color: 'text-green-500'
  },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Visão Geral</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                <p className={`text-sm mt-2 ${
                  metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.change} desde o último mês
                </p>
              </div>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Mensagens e Conversões</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="mensagens" 
                  stackId="1"
                  stroke="#25D366" 
                  fill="#25D366" 
                  fillOpacity={0.2}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversoes" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Vendas via WhatsApp</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="vendas" 
                  fill="#25D366"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
