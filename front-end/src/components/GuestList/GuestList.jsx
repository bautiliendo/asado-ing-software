import './GuestList.css';

function GuestList() {

    const guests = [
        { id: 1, name: 'Juan Pérez', alias: 'Juancito', item: 'Carne', cost: 5000 },
        { id: 2, name: 'María Garcia', alias: 'Mary', item: 'Bebidas', cost: 3000 },
        { id: 3, name: 'Carlos López', alias: 'Charly', item: 'Ensalada', cost: 1500 },
    ];

    const totalCost = guests.reduce((total, guest) => total + guest.cost, 0);
    const costPerPerson = totalCost / guests.length;

    return (
        <div className="guest-list-container">
            <h2>👥 Invitados</h2>
            <table className="guest-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Alias</th>
                        <th>Lleva</th>
                        <th>Gastó</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.map(guest => (
                        <tr key={guest.id}>
                            <td>{guest.name}</td>
                            <td>{guest.alias}</td>
                            <td>{guest.item}</td>
                            <td className="amount-column">${guest.cost}</td>
                            <td className="actions-cell">
                                <div className="actions-container">
                                    <button className="icon-button edit-guest-btn" title="Editar">Editar</button>
                                    <button className="icon-button delete-guest-btn" title="Eliminar">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="add-guest-button">
                + Agregar Invitado
            </button>

            <div>
                <h3>Total de la compra: ${totalCost}</h3>
                <p>Cada uno: ${costPerPerson}</p>
            </div>
        </div>
    );
}

export default GuestList;
