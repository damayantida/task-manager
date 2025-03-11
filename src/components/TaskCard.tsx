import { Task, tasksAtom, priorityIcons } from '@/store/tasks';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({
	task,
	isDraggingOverlay = false,
}: {
	task: Task;
	isDraggingOverlay?: boolean;
}) => {
	const [tasks, setTasks] = useAtom(tasksAtom);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description || '');
	const [priority, setPriority] = useState(task.priority);
	const priorityIcon = priorityIcons[priority];

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: task.id,
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		opacity: isDragging && !isDraggingOverlay ? 0 : 1,
		width: isDraggingOverlay ? 'auto' : undefined,
		height: isDraggingOverlay ? 'auto' : undefined,
	};

	// Update the task
	const updateTask = () => {
		setTasks((prevTasks) =>
			prevTasks.map((t) => (t.id === task.id ? { ...t, title, priority } : t))
		);
		setIsEditing(false);
	};

	// Delete the task
	const deleteTask = () => {
		setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`bg-white p-3 shadow-md rounded-md relative ${
				isDraggingOverlay ? 'cursor-grabbing' : 'cursor-grab'
			}`}
		>
			{isEditing ? (
				<div className='flex flex-col gap-2 text-base'>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Task Title'
						className='border p-2 w-full'
					/>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Task description'
						className='border p-2 w-full'
						rows={2}
					/>
					<div className='relative'>
						<select
							value={priority}
							onChange={(e) => setPriority(e.target.value as Task['priority'])}
							className='border p-2 pr-8 appearance-none w-full h-full'
						>
							<option value='Low'>Low</option>
							<option value='Medium'>Medium</option>
							<option value='High'>High</option>
						</select>
						<div className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
							▼
						</div>
					</div>
					<button
						onClick={updateTask}
						className='bg-gray-900 text-white p-2 rounded cursor-pointer hover:bg-black hover:scale-95 transition-all duration-300 ease-in-out'
					>
						Save
					</button>
				</div>
			) : (
				<>
					<div
						{...(!isDragging ? attributes : {})}
						{...(!isDragging ? listeners : {})}
					>
						<img
							src={priorityIcon}
							alt='priority icon'
							className='absolute top-3 left-2'
						/>
						<h3 className='font-semibold pl-6 mb-1 mr-16'>{task.title}</h3>
						{task.description && (
							<p className='text-sm text-gray-800 pl-6 mb-1'>
								{task.description}
							</p>
						)}
						<p className='text-sm text-gray-800 pl-6'>
							<b>Priority:</b> {task.priority}
						</p>
					</div>
					<div className='absolute top-2 right-2 flex gap-2'>
						<button
							onClick={() => setIsEditing(true)}
							className='cursor-pointer hover:scale-90 transition-all duration-300 ease-in-out'
						>
							<img src='/edit.svg' alt='edit icon' />
						</button>
						<button
							onClick={deleteTask}
							className='cursor-pointer hover:scale-90 transition-all duration-300 ease-in-out'
						>
							<img src='/trash.svg' alt='delete icon' />
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default TaskCard;
