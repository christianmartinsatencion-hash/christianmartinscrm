# Christian Martins CRM

Base moderna, limpa e modular para sistema de CRM (Customer Relationship Management).

## 🚀 Tecnologias Utilizadas

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Motion**

## 📁 Estrutura do Projeto

```
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx        # Navegação principal e menu lateral
│   │   ├── Header.tsx         # Barra superior com busca e ações rápidas
│   │   ├── DashboardView.tsx  # Visão geral de métricas e KPIs
│   │   ├── ContactsView.tsx   # Gerenciamento de clientes e contatos
│   │   ├── DealsView.tsx      # Funil de vendas (Pipeline Kanban)
│   │   ├── TasksView.tsx      # Gestão de tarefas e follow-ups
│   │   └── SettingsView.tsx   # Perfil e configurações do sistema
│   ├── types/
│   │   └── crm.ts             # Definições de tipos e interfaces
│   ├── App.tsx                # Componente raiz da aplicação
│   ├── main.tsx               # Ponto de entrada React
│   └── index.css              # Estilos globais e Tailwind
├── index.html
├── metadata.json
├── package.json
└── vite.config.ts
```

## 🛠️ Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Build para produção**:
   ```bash
   npm run build
   ```

## 👤 Autor

- **Christian Martins**
