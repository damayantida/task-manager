'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';
import { tasksAtom, Task } from '../store/tasks';

const TaskForm = () => {
	const [, setTasks] = useAtom(tasksAtom);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
	const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Done'>(
		'To Do'
	);

	const addTask = () => {
		if (!title.trim()) return; // Prevent empty tasks

		const newTask: Task = {
			id: Date.now().toString(),
			title,
			description,
			priority,
			status,
		};

		setTasks((prevTasks) => [...prevTasks, newTask]);
		setTitle(''); // Reset title
		setDescription(''); // Reset description
		setPriority('Medium'); // Reset priority
		setStatus('To Do'); // Reset status
	};

	return (
		<div className='flex gap-2 mt-10 items-start justify-center max-md:flex-col max-md:items-center max-md:px-4 max-md:mt-6'>
			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Task Title'
				className='border p-2 w-1/4 form max-md:w-full max-md:text-sm'
			/>
			<textarea
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder='Task description'
				className='border p-2 w-1/3 form max-md:w-full max-md:text-sm'
				rows={1}
			/>
			<div className='relative max-md:w-full'>
				<select
					value={priority}
					onChange={(e) => setPriority(e.target.value as Task['priority'])}
					className='border p-2 pr-8 appearance-none w-fit max-md:w-full h-full form cursor-pointer max-md:text-sm'
				>
					<option value='Low'>Low</option>
					<option value='Medium'>Medium</option>
					<option value='High'>High</option>
				</select>
				<div className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
					▼
				</div>
			</div>
			<div className='relative max-md:w-full'>
				<select
					value={status}
					onChange={(e) => setStatus(e.target.value as Task['status'])}
					className='border p-2 pr-8 appearance-none w-fit max-md:w-full h-full form cursor-pointer max-md:text-sm'
				>
					<option value='To Do'>To Do</option>
					<option value='In Progress'>In Progress</option>
					<option value='Done'>Done</option>
				</select>
				<div className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
					▼
				</div>
			</div>
			<button
				onClick={addTask}
				className='bg-gray-900 text-white py-2 px-6 cursor-pointer border border-gray-900 rounded-full hover:scale-95 hover:bg-black transition-all duration-300 ease-in-out max-md:w-full max-md:text-base max-md:rounded-xl'
			>
				Create
			</button>
		</div>
	);
};

export default TaskForm;
