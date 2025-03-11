import TaskBoard from '@/components/TaskBoard';
import TaskForm from '@/components/TaskForm';

const page = () => {
	return (
		<div>
			<h1 className='text-6xl max-sm:text-4xl max-md:text-5xl text-center font-bold'>
				Task Management
			</h1>
			<TaskForm />
			<TaskBoard />
		</div>
	);
};

export default page;
