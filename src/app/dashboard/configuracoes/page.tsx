'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Building2,
  CreditCard,
  Bell,
  Lock,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  MessageSquare,
  Save,
  Plus
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState('empresa');

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="empresa" className="gap-2">
            <Building2 className="w-4 h-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="pagamento" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Pagamento
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-2">
            <Lock className="w-4 h-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Empresa */}
        <TabsContent value="empresa">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Informações da Empresa</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nome da Empresa</label>
                  <Input placeholder="Digite o nome da empresa" />
                </div>
                <div>
                  <label className="text-sm font-medium">CNPJ</label>
                  <Input placeholder="Digite o CNPJ" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Telefone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input placeholder="(00) 0000-0000" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Input placeholder="email@empresa.com" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Endereço</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Digite o endereço completo" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Cidade</label>
                  <Input placeholder="Digite a cidade" />
                </div>
                <div>
                  <label className="text-sm font-medium">Estado</label>
                  <Input placeholder="Digite o estado" />
                </div>
                <div>
                  <label className="text-sm font-medium">CEP</label>
                  <Input placeholder="00000-000" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Website</label>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="https://www.empresa.com" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Pagamento */}
        <TabsContent value="pagamento">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Métodos de Pagamento</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CreditCard className="w-6 h-6" />
                  <div>
                    <h3 className="font-medium">Cartão de Crédito</h3>
                    <p className="text-sm text-muted-foreground">**** **** **** 4242</p>
                  </div>
                </div>
                <Button variant="outline">Alterar</Button>
              </div>

              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Novo Método
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notificacoes">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Preferências de Notificação</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Novas Mensagens</h3>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações quando houver novas mensagens
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Novas Vendas</h3>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações quando houver novas vendas
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Relatórios Semanais</h3>
                  <p className="text-sm text-muted-foreground">
                    Receba relatórios semanais de desempenho
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="seguranca">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Configurações de Segurança</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Alterar Senha</h3>
                <div className="space-y-4">
                  <Input type="password" placeholder="Senha atual" />
                  <Input type="password" placeholder="Nova senha" />
                  <Input type="password" placeholder="Confirmar nova senha" />
                  <Button>Atualizar Senha</Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Autenticação em Duas Etapas</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
