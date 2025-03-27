'use client';

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Search,
  Filter,
  Plus,
  Webhook,
  Link,
  Settings,
  Copy,
  Key,
  RefreshCw,
  MoreVertical,
  Check,
  X
} from "lucide-react";

const integrations = [
  {
    id: 1,
    name: 'Webhook Principal',
    description: 'Webhook para receber notificações de mensagens',
    status: 'Ativo',
    url: 'https://api.example.com/webhook',
    lastSync: '2024-01-30T15:30:00',
    events: ['mensagem.recebida', 'mensagem.enviada'],
  },
  {
    id: 2,
    name: 'API de Vendas',
    description: 'Integração com sistema de vendas',
    status: 'Inativo',
    url: 'https://api.example.com/sales',
    lastSync: '2024-01-29T10:15:00',
    events: ['venda.criada', 'venda.atualizada'],
  },
  // Adicione mais integrações conforme necessário
];

const metrics = [
  {
    title: 'Integrações Ativas',
    value: '5',
    icon: Webhook,
  },
  {
    title: 'Eventos por Hora',
    value: '1,234',
    icon: RefreshCw,
  },
  {
    title: 'Taxa de Sucesso',
    value: '99.9%',
    icon: Check,
  },
];

export default function Integrations() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Integrações</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Integração
        </Button>
      </div>

      {/* API Key Section */}
      <Card className="p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Chave da API</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Use esta chave para autenticar suas requisições à API
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              value="sk_test_1234567890abcdef"
              className="w-96"
              readOnly
            />
            <Button variant="outline" size="icon">
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

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

      {/* Integrations List */}
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Buscar integrações..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="divide-y">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                    <Webhook className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {integration.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Link className="w-4 h-4" />
                        {integration.url}
                      </div>
                      <div className="flex items-center gap-1">
                        <RefreshCw className="w-4 h-4" />
                        Última sincronização: {new Date(integration.lastSync).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    integration.status === 'Ativo'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    <div className="flex items-center gap-1">
                      {integration.status === 'Ativo' ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                      {integration.status}
                    </div>
                  </div>

                  <Switch
                    checked={integration.status === 'Ativo'}
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
