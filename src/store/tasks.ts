import { atom } from 'jotai';

export const defaultTasks: Task[] = [
	{
		id: '1',
		title: 'Task Title',
		description: 'This is your first task! Edit or delete it as needed.',
		priority: 'Medium',
		status: 'To Do',
	},
];

export type Task = {
	id: string;
	title: string;
	description?: string;
	priority: 'Low' | 'Medium' | 'High';
	status: 'To Do' | 'In Progress' | 'Done';
};

export const tasksAtom = atom<Task[]>([]);

export const priorityIcons = {
	Low: '/priority-low.svg',
	Medium: '/priority-medium.svg',
	High: '/priority-high.svg',
};
