import React, { useState } from 'react';
import { Plus, CheckSquare, Square, Calendar, Flag, Trash2 } from 'lucide-react';
import { Task } from '../types/crm';
import { useLanguage } from '../context/LanguageContext';

interface TasksViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onDeleteTask?: (taskId: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ tasks, onToggleTask, onAddTask, onDeleteTask }) => {
  const { t, formatDate } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [formData, setFormData] = useState({
    title: '',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    priority: 'medium' as Task['priority'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onAddTask(formData);
    setFormData({
      title: '',
      dueDate: new Date().toISOString().split('T')[0],
      completed: false,
      priority: 'medium',
    });
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter((tItem) => {
    if (filter === 'pending') return !tItem.completed;
    if (filter === 'completed') return tItem.completed;
    return true;
  });

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return (
          <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
            <Flag className="h-3 w-3" /> {t('priorityHigh')}
          </span>
        );
      case 'medium':
        return (
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
            <Flag className="h-3 w-3" /> {t('priorityMedium')}
          </span>
        );
      case 'low':
        return (
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            <Flag className="h-3 w-3" /> {t('priorityLow')}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{t('tasksTitle')}</h3>
          <p className="text-xs text-slate-500">{t('tasksSubtitle')}</p>
        </div>
        <div className="flex items-center gap-2.5">
          {/* Filters */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                filter === 'all' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tasks.length} Total
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                filter === 'pending' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tasks.filter((x) => !x.completed).length} Pendentes
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                filter === 'completed' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tasks.filter((x) => x.completed).length} Concluídas
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            {t('btnNewTask')}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs">
        <div className="divide-y divide-slate-100">
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <CheckSquare className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-2 text-xs font-medium text-slate-600">{t('emptyTasksTitle')}</p>
              <p className="text-[11px] text-slate-400">{t('emptyTasksDesc')}</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1 pr-4">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-blue-600 transition-colors shrink-0"
                    aria-label={task.completed ? 'Marcar como pendente' : 'Concluir tarefa'}
                  >
                    {task.completed ? (
                      <CheckSquare className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-medium ${
                        task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {getPriorityBadge(task.priority)}
                  {onDeleteTask && (
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      title="Excluir Tarefa"
                      className="text-slate-300 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in-50 zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">{t('modalNewTask')}</h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700">{t('labelTaskTitle')} *</label>
                <input
                  type="text"
                  required
                  placeholder={t('placeholderTaskTitle')}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">{t('labelDueDate')}</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">{t('labelPriority')}</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="low">{t('priorityLow')}</option>
                  <option value="medium">{t('priorityMedium')}</option>
                  <option value="high">{t('priorityHigh')}</option>
                </select>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {t('btnCancel')}
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  {t('btnSaveTask')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
