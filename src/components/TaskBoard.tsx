'use client';

import { useAtom } from 'jotai';
import TaskColumn from './TaskColumn';
import { tasksAtom, Task, defaultTasks } from '../store/tasks';
import {
	DndContext,
	DragEndEvent,
	DragStartEvent,
	DragOverlay,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import { motion } from 'framer-motion';

const statuses: Task['status'][] = ['To Do', 'In Progress', 'Done'];

const TaskBoard = () => {
	const [tasks, setTasks] = useAtom(tasksAtom);
	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const [isHydrated, setIsHydrated] = useState(false);

	// Load tasks from Local Storage & insert default tasks if empty
	useEffect(() => {
		const savedTasks = localStorage.getItem('tasks');
		if (savedTasks) {
			setTasks(JSON.parse(savedTasks));
		} else {
			setTasks(defaultTasks);
			localStorage.setItem('tasks', JSON.stringify(defaultTasks));
		}
		setTimeout(() => setIsHydrated(true), 300);
	}, [setTasks]);

	// Save tasks to Local Storage whenever they change (only after hydration)
	useEffect(() => {
		if (isHydrated) {
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}, [tasks, isHydrated]);

	const handleDragStart = (event: DragStartEvent) => {
		const taskId = event.active.id;
		const task = tasks.find((task) => task.id === taskId);
		if (task) setActiveTask(task);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;

		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === active.id
					? { ...task, status: over.id as Task['status'] }
					: task
			)
		);

		setActiveTask(null);
	};

	if (!isHydrated)
		return (
			<div className='flex justify-center pt-25'>
				<p className='text-lg text-gray-600 animate-pulse'>Loading tasks...</p>
			</div>
		);

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<motion.div
				className='flex justify-center gap-4 p-5 max-md:flex-col'
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
			>
				{statuses.map((status, index) => (
					<motion.div
						key={status}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.15 }}
						className='w-full'
					>
						<TaskColumn
							key={status}
							status={status}
							tasks={tasks.filter((task) => task.status === status)}
						/>
					</motion.div>
				))}
			</motion.div>

			<DragOverlay>
				{activeTask ? (
					<div className='h-fit'>
						<TaskCard task={activeTask} isDraggingOverlay={true} />
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default TaskBoard;
