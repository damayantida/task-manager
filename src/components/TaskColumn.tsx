import { Task } from '@/store/tasks';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';

const TaskColumn = ({
	status,
	tasks,
}: {
	status: Task['status'];
	tasks: Task[];
}) => {
	const { setNodeRef } = useDroppable({ id: status });

	return (
		<div ref={setNodeRef} className='w-full h-full bg-gray-800 p-4 rounded-xl'>
			<h2 className='text-lg font-bold text-white'>{status}</h2>
			<div className='mt-3 flex flex-col gap-3'>
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};

export default TaskColumn;
