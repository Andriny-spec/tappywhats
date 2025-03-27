import { useQuery, useQueryClient } from '@tanstack/react-query';
import { whatsappService } from '../services/whatsapp';
import { useEffect } from 'react';

export const useWhatsAppContacts = () => {
  const queryClient = useQueryClient();

  // Buscar contatos
  const { data: contacts = [], isLoading, error } = useQuery({
    queryKey: ['whatsapp-contacts'],
    queryFn: () => whatsappService.getContacts(),
    refetchInterval: 30000, // Atualizar a cada 30 segundos
  });

  // Observar mudanças nos contatos
  useEffect(() => {
    const unsubscribe = whatsappService.observeChats((newContacts) => {
      queryClient.setQueryData(['whatsapp-contacts'], newContacts);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [queryClient]);

  return {
    contacts,
    isLoading,
    error,
  };
};

export default useWhatsAppContacts;
