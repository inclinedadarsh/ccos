"use client";
import NewUser from "@/components/NewUser";
import { useState } from "react";

const Dashboard = () => {
	const [newUser, setNewUser] = useState(true);

	if (newUser) {
		return <NewUser />;
	}

	return <div>Dashboard</div>;
};

export default Dashboard;
