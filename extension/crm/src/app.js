// Estado da aplicação
let state = {
    boards: [],
    currentBoard: null,
    cards: []
};

// Elementos DOM
const app = document.getElementById('app');
const emptyState = document.querySelector('.empty-state');
const addBoardButtons = document.querySelectorAll('.add-board, .add-board-button');

// Event Listeners
addBoardButtons.forEach(button => {
    button.addEventListener('click', () => {
        showAddBoardModal();
    });
});

// Carregar conversas do WhatsApp
function loadWhatsAppChats() {
    // Primeiro, vamos limpar os cards na primeira coluna para não duplicar
    if (state.currentBoard && state.currentBoard.columns[0]) {
        state.currentBoard.columns[0].cards = [];
    }
    
    // Agora, obter conversas do WhatsApp da storage local
    chrome.storage.local.get(['whatsappChats', 'whatsappContacts'], (result) => {
        // Se não houver board, criar um padrão
        if (!state.currentBoard) {
            createDefaultBoard();
        }
        
        // Processar contatos do WhatsApp
        if (result.whatsappContacts && result.whatsappContacts.length > 0) {
            console.log('Contatos encontrados:', result.whatsappContacts.length);
            
            // Adicionar contatos como cards
            result.whatsappContacts.forEach(contact => {
                const card = {
                    id: `contact-${contact.id || Date.now() + Math.random()}`,
                    title: contact.name || contact.number,
                    description: contact.status || 'Sem status',
                    createdAt: new Date(),
                    tags: [contact.isGroup ? 'Grupo' : 'Contato'],
                    contact: {
                        id: contact.id,
                        name: contact.name,
                        number: contact.number,
                        profilePic: contact.profilePic || null,
                        status: contact.status,
                        isGroup: contact.isGroup || false
                    }
                };
                
                // Adicionar ao primeiro estágio (primeira coluna)
                if (state.currentBoard.columns[0]) {
                    state.currentBoard.columns[0].cards.push(card);
                }
            });
        }
        
        // Processar conversas do WhatsApp se não tiver contatos
        if ((!result.whatsappContacts || result.whatsappContacts.length === 0) && 
            result.whatsappChats && result.whatsappChats.length > 0) {
            console.log('Conversas encontradas:', result.whatsappChats.length);
            
            // Adicionar chats como cards
            result.whatsappChats.forEach(chat => {
                const card = {
                    id: `chat-${chat.id || Date.now() + Math.random()}`,
                    title: chat.title || chat.number,
                    description: chat.lastMessage || 'Sem mensagens',
                    createdAt: new Date(),
                    tags: [chat.status || 'Novo'],
                    contact: {
                        id: chat.id,
                        name: chat.title,
                        number: chat.number,
                        profilePic: chat.profilePic || null,
                        lastMessage: chat.lastMessage,
                        lastMessageTime: chat.time,
                        status: chat.status || 'Disponível'
                    }
                };
                
                // Adicionar ao primeiro estágio (primeira coluna)
                if (state.currentBoard.columns[0]) {
                    state.currentBoard.columns[0].cards.push(card);
                }
            });
        }
        
        // Se não temos nenhum contato ou conversa, tentar carregar do WhatsApp
        if ((!result.whatsappContacts || result.whatsappContacts.length === 0) && 
            (!result.whatsappChats || result.whatsappChats.length === 0)) {
            console.log('Tentando carregar contatos e conversas do WhatsApp...');
            requestWhatsAppData();
        }
        
        saveState();
        renderBoard();
    });
}

// Função para solicitar dados atualizados do WhatsApp
function requestWhatsAppData() {
    // Enviar mensagem para o background script solicitar dados do WhatsApp
    chrome.runtime.sendMessage({
        action: 'getWhatsAppData'
    }, (response) => {
        if (response && response.success) {
            console.log('Solicitação de dados do WhatsApp enviada com sucesso');
            // Os dados serão processados pelo background e salvos no storage
            // loadWhatsAppChats será chamado novamente após isso
        } else {
            console.error('Erro ao solicitar dados do WhatsApp:', response?.error || 'Desconhecido');
        }
    });
}

// Criar board padrão
function createDefaultBoard() {
    const board = {
        id: Date.now(),
        name: 'Pipeline de Vendas',
        columns: [
            { id: 1, name: 'Novo', cards: [] },
            { id: 2, name: 'Primeiro Contato', cards: [] },
            { id: 3, name: 'Qualificado', cards: [] },
            { id: 4, name: 'Proposta', cards: [] },
            { id: 5, name: 'Fechado', cards: [] }
        ]
    };
    
    state.boards.push(board);
    state.currentBoard = board;
    saveState();
}

// Funções do Modal
function showAddBoardModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Nova Aba</h3>
                <button class="modal-close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="form-group">
                <label for="board-name">Nome da Aba</label>
                <input type="text" id="board-name" placeholder="Ex: Pipeline de Vendas">
            </div>
            <div class="form-group">
                <label for="board-columns">Colunas</label>
                <textarea id="board-columns" rows="4" placeholder="Novo&#10;Primeiro Contato&#10;Qualificado&#10;Proposta&#10;Fechado"></textarea>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel">Cancelar</button>
                <button class="btn-save">Criar Aba</button>
            </div>
        </div>
    `;

    // Event Listeners do Modal
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.btn-cancel');
    const saveBtn = modal.querySelector('.btn-save');

    closeBtn.addEventListener('click', () => closeModal(modal));
    cancelBtn.addEventListener('click', () => closeModal(modal));
    saveBtn.addEventListener('click', () => {
        const name = modal.querySelector('#board-name').value;
        const columns = modal.querySelector('#board-columns').value
            .split('\n')
            .filter(col => col.trim());

        if (name && columns.length > 0) {
            createBoard(name, columns);
            closeModal(modal);
        }
    });

    document.body.appendChild(modal);
}

function closeModal(modal) {
    modal.remove();
}

// Funções do Board
function createBoard(name, columns) {
    const board = {
        id: Date.now(),
        name,
        columns: columns.map(col => ({
            id: Date.now() + Math.random(),
            name: col,
            cards: []
        }))
    };

    state.boards.push(board);
    state.currentBoard = board;
    saveState();
    renderBoard();
}

function renderBoard() {
    if (state.currentBoard) {
        emptyState.style.display = 'none';
        
        const kanbanBoard = document.createElement('div');
        kanbanBoard.className = 'kanban-board';
        kanbanBoard.style.display = 'flex';

        state.currentBoard.columns.forEach(column => {
            const columnElement = createColumnElement(column);
            kanbanBoard.appendChild(columnElement);
        });

        // Remove o board anterior se existir
        const oldBoard = document.querySelector('.kanban-board');
        if (oldBoard) {
            oldBoard.remove();
        }

        app.appendChild(kanbanBoard);
        
        // Inicializar drag and drop
        initDragAndDrop();
    }
}

function createColumnElement(column) {
    const columnElement = document.createElement('div');
    columnElement.className = 'kanban-column';
    columnElement.setAttribute('data-column-id', column.id);
    columnElement.innerHTML = `
        <div class="column-header">
            <span class="column-title">${column.name}</span>
            <span class="column-count">${column.cards.length}</span>
        </div>
        <div class="column-content" data-column-id="${column.id}">
        </div>
    `;

    const columnContent = columnElement.querySelector('.column-content');
    columnContent.addEventListener('dragover', handleDragOver);
    columnContent.addEventListener('drop', handleDrop);

    // Adiciona os cards da coluna
    column.cards.forEach(card => {
        const cardElement = createCardElement(card);
        columnContent.appendChild(cardElement);
    });

    return columnElement;
}

function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.setAttribute('draggable', true);
    cardElement.setAttribute('data-card-id', card.id);
    
    // Definir o placeholder padrão para avatar
    const avatarPlaceholder = `
        <div class="avatar-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        </div>
    `;
    
    // Verificar se tem informações de contato
    const contact = card.contact || {};
    const phoneNumber = contact.number ? `<div class="card-phone">${contact.number}</div>` : '';
    const status = contact.status ? `<div class="card-status">${contact.status}</div>` : '';
    
    let avatarHtml = '';
    if (contact.profilePic) {
        avatarHtml = `<div class="card-avatar"><img src="${contact.profilePic}" alt="${card.title}" /></div>`;
    } else {
        avatarHtml = `<div class="card-avatar">${avatarPlaceholder}</div>`;
    }
    
    // Tag que indica se é um grupo
    let groupTag = '';
    if (contact.isGroup) {
        groupTag = `<span class="tag tag-group">Grupo</span>`;
    }
    
    cardElement.innerHTML = `
        <div class="card-header">
            ${avatarHtml}
            <div class="card-header-info">
                <div class="card-title">${card.title}</div>
                ${phoneNumber}
            </div>
        </div>
        <div class="card-description">${card.description || ''}</div>
        ${status}
        <div class="card-meta">
            <div class="card-tags">
                ${groupTag}
                ${card.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <span class="card-date">${formatDate(card.createdAt)}</span>
        </div>
    `;

    cardElement.addEventListener('dragstart', handleDragStart);
    cardElement.addEventListener('dragend', handleDragEnd);
    cardElement.addEventListener('click', () => showCardModal(card));

    return cardElement;
}

// Drag and Drop
function initDragAndDrop() {
    const cards = document.querySelectorAll('.card');
    const columns = document.querySelectorAll('.column-content');

    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-card-id'));
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const card = document.querySelector(`[data-card-id="${cardId}"]`);
    const column = e.target.closest('.column-content');
    
    if (card && column) {
        const columnId = column.getAttribute('data-column-id');
        const cardData = findCard(cardId);
        const oldColumn = findCardColumn(cardId);
        
        if (cardData && oldColumn) {
            // Remover card da coluna antiga
            oldColumn.cards = oldColumn.cards.filter(c => c.id != cardId);
            
            // Adicionar card na nova coluna
            const newColumn = state.currentBoard.columns.find(col => col.id == columnId);
            if (newColumn) {
                newColumn.cards.push(cardData);
                
                // Atualizar status do card
                cardData.tags = [newColumn.name];
                
                saveState();
                renderBoard();
            }
        }
    }
}

// Funções Auxiliares
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

function findCard(cardId) {
    for (const column of state.currentBoard.columns) {
        const card = column.cards.find(c => c.id == cardId);
        if (card) return card;
    }
    return null;
}

function findCardColumn(cardId) {
    return state.currentBoard.columns.find(col => 
        col.cards.some(card => card.id == cardId)
    );
}

function saveState() {
    localStorage.setItem('tappywhats-crm-state', JSON.stringify(state));
}

function loadState() {
    const savedState = localStorage.getItem('tappywhats-crm-state');
    if (savedState) {
        state = JSON.parse(savedState);
        if (state.currentBoard) {
            renderBoard();
        }
    }
}

// Função para exibir detalhes do card em modal
function showCardModal(card) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';

    // Definir o placeholder padrão para avatar
    const avatarPlaceholder = `
        <div class="avatar-placeholder-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        </div>
    `;
    
    // Verificar se tem informações de contato
    const contact = card.contact || {};
    let avatarHtml = '';
    
    if (contact.profilePic) {
        avatarHtml = `<div class="modal-avatar"><img src="${contact.profilePic}" alt="${card.title}" /></div>`;
    } else {
        avatarHtml = `<div class="modal-avatar">${avatarPlaceholder}</div>`;
    }
    
    // Informações detalhadas do contato
    const contactInfo = `
        <div class="contact-details">
            ${contact.number ? `<div class="detail-item"><strong>Telefone:</strong> ${contact.number}</div>` : ''}
            ${contact.status ? `<div class="detail-item"><strong>Status:</strong> ${contact.status}</div>` : ''}
            ${contact.lastMessage ? `<div class="detail-item"><strong>Última mensagem:</strong> ${contact.lastMessage}</div>` : ''}
            ${contact.lastMessageTime ? `<div class="detail-item"><strong>Hora:</strong> ${contact.lastMessageTime}</div>` : ''}
            ${contact.isGroup ? `<div class="detail-item"><strong>Tipo:</strong> Grupo</div>` : ''}
        </div>
    `;
    
    // Botão para abrir o WhatsApp Web com este contato
    const openChatButton = contact.number ? `
        <button class="btn-open-chat" onclick="window.open('https://web.whatsapp.com/send?phone=${contact.number.replace(/\D/g, '')}')">Abrir no WhatsApp</button>
    ` : '';

    modal.innerHTML = `
        <div class="modal-content modal-card">
            <div class="modal-header">
                <h3 class="modal-title">Detalhes do Contato</h3>
                <button class="modal-close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="card-details">
                    <div class="card-detail-header">
                        ${avatarHtml}
                        <h2>${card.title}</h2>
                    </div>
                    ${contactInfo}
                </div>
                <div class="card-actions">
                    ${openChatButton}
                    <button class="btn-move-card">Mover para próxima etapa</button>
                </div>
            </div>
        </div>
    `;

    // Event Listeners do Modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    // Botão para mover o card para a próxima coluna
    const moveBtn = modal.querySelector('.btn-move-card');
    if (moveBtn) {
        moveBtn.addEventListener('click', () => {
            moveCardToNextColumn(card.id);
            closeModal(modal);
        });
    }

    document.body.appendChild(modal);
}

// Função para mover um card para a próxima coluna
function moveCardToNextColumn(cardId) {
    const currentColumn = findCardColumn(cardId);
    if (currentColumn && state.currentBoard) {
        const currentColumnIndex = state.currentBoard.columns.findIndex(col => col.id === currentColumn.id);
        const nextColumnIndex = currentColumnIndex + 1;
        
        if (nextColumnIndex < state.currentBoard.columns.length) {
            // Encontrar o card e remover da coluna atual
            const cardIndex = currentColumn.cards.findIndex(card => card.id === cardId);
            if (cardIndex !== -1) {
                const card = currentColumn.cards[cardIndex];
                currentColumn.cards.splice(cardIndex, 1);
                
                // Adicionar à próxima coluna
                state.currentBoard.columns[nextColumnIndex].cards.push(card);
                
                saveState();
                renderBoard();
            }
        }
    }
}

// Inicialização
loadState();
loadWhatsAppChats(); // Carregar conversas do WhatsApp
