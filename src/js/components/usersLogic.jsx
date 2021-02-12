import React from "react";

function User({ list }) {

	const usersWrite = () =>
		list.map((user) => (
			<li key={list.id} style={{marginBottom: "10px"}}>
				{
				`firstName: ${user.firstName},
				lastName: ${user.lastName},
				fullName: ${user.firstName} ${user.lastName},
				age: ${user.age + 5},
				job: ${user.job}`
				}
			</li>
		));

	return (
		<ol style={{ display: "flex", flexDirection: "column" , alignItems: "center", padding: "0"}}>
			{ usersWrite() }
		</ol>
	)
}

export default User;
