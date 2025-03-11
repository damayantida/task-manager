import '@/app/globals.css';

export const metadata = {
	title: 'Task Manager',
	description: 'Manage your tasks with ease.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
