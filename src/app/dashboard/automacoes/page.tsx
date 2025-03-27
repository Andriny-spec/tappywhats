'use client';

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Search,
  Filter,
  Plus,
  Bot,
  Clock,
  MessageSquare,
  Settings,
  MoreVertical,
  Play,
  Pause
} from "lucide-react";

const automations = [
  {
    id: 1,
    name: 'Boas-vindas',
    description: 'Mensagem automática de boas-vindas para novos contatos',
    status: 'Ativo',
    triggers: 'Novo contato',
    messages: 152,
    lastRun: '2024-01-30T15:30:00',
  },
  {
    id: 2,
    name: 'Recuperação',
    description: 'Mensagem para clientes inativos há mais de 30 dias',
    status: 'Inativo',
    triggers: 'Cliente inativo',
    messages: 89,
    lastRun: '2024-01-29T10:15:00',
  },
  // Adicione mais automações conforme necessário
];

const metrics = [
  {
    title: 'Automações Ativas',
    value: '8',
    icon: Bot,
  },
  {
    title: 'Mensagens Enviadas',
    value: '1,234',
    icon: MessageSquare,
  },
  {
    title: 'Tempo Médio',
    value: '2min',
    icon: Clock,
  },
];

export default function Automations() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Automações</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Automação
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
              </div>
              <metric.icon className="w-5 h-5 text-[#25D366]" />
            </div>
          </Card>
        ))}
      </div>

      {/* Automations List */}
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Buscar automações..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="divide-y">
          {automations.map((automation) => (
            <div
              key={automation.id}
              className="p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{automation.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {automation.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {automation.messages} mensagens
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Última execução: {new Date(automation.lastRun).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    automation.status === 'Ativo'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    <div className="flex items-center gap-1">
                      {automation.status === 'Ativo' ? (
                        <Play className="w-3 h-3" />
                      ) : (
                        <Pause className="w-3 h-3" />
                      )}
                      {automation.status}
                    </div>
                  </div>

                  <Switch
                    checked={automation.status === 'Ativo'}
                    onCheckedChange={() => {}}
                  />

                  <Button variant="ghost" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>

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
