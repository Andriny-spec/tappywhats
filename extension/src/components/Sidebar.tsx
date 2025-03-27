import { motion } from 'framer-motion';
import { useStore } from '../store';

const Sidebar = () => {
  const contacts = useStore((state) => state.contacts);

  const columns = [
    { id: 'lead', title: 'Leads' },
    { id: 'client', title: 'Clientes' },
    { id: 'archived', title: 'Arquivados' }
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      className="fixed right-0 top-0 h-full w-80 bg-background shadow-lg p-4"
    >
      <h2 className="text-2xl font-bold mb-6">Gerenciamento de Contatos</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-card rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">{column.title}</h3>
            <div className="space-y-2">
              {contacts
                .filter((contact) => contact.status === column.id)
                .map((contact) => (
                  <motion.div
                    key={contact.id}
                    layoutId={contact.id}
                    className="bg-popover p-3 rounded cursor-pointer"
                  >
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    {contact.notes && (
                      <p className="text-xs mt-1 text-muted-foreground">
                        {contact.notes}
                      </p>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
