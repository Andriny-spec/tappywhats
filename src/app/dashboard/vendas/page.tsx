'use client';

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 5000 },
  { name: 'Abr', vendas: 2780 },
  { name: 'Mai', vendas: 1890 },
  { name: 'Jun', vendas: 2390 },
  { name: 'Jul', vendas: 3490 },
];

const metrics = [
  {
    title: 'Vendas do Mês',
    value: 'R$ 12.450',
    change: '+12%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Ticket Médio',
    value: 'R$ 350',
    change: '+5%',
    trend: 'up',
    icon: ShoppingCart,
  },
  {
    title: 'Taxa de Conversão',
    value: '2.4%',
    change: '-0.5%',
    trend: 'down',
    icon: Users,
  },
];

const recentSales = [
  {
    id: 1,
    customer: 'João Silva',
    product: 'Plano Premium',
    amount: 'R$ 299,00',
    status: 'Concluído',
    date: '30 Jan, 2024',
  },
  {
    id: 2,
    customer: 'Maria Santos',
    product: 'Plano Basic',
    amount: 'R$ 149,00',
    status: 'Pendente',
    date: '29 Jan, 2024',
  },
  // Adicione mais vendas conforme necessário
];

export default function Sales() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Vendas</h1>
        <Button>Nova Venda</Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                <p className={`text-sm mt-2 flex items-center gap-1 ${
                  metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {metric.change} desde o último mês
                </p>
              </div>
              <metric.icon className="w-5 h-5 text-[#25D366]" />
            </div>
          </Card>
        ))}
      </div>

      {/* Sales Chart */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Histórico de Vendas</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="vendas"
                stroke="#25D366"
                fill="#25D366"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Sales */}
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Vendas Recentes</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Buscar vendas..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {recentSales.map((sale) => (
            <div
              key={sale.id}
              className="p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-medium">
                    {sale.customer.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{sale.customer}</h3>
                    <p className="text-sm text-muted-foreground">
                      {sale.product}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <p className="font-medium">{sale.amount}</p>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    sale.status === 'Concluído'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {sale.status}
                  </div>
                  <p className="text-sm text-muted-foreground">{sale.date}</p>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
