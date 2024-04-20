function Representation({name, age}) {
	return (
			<table>
				<tbody>
					<tr>
						<td>{name}</td>
						<td>{age}</td>
					</tr>
				</tbody>
			</table>
		)
}

function Wraper() {
	return (
			<Representation name={'radek'} age={'39'}/>
		)
}

export { Wraper }