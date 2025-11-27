import { useState, useEffect } from 'react';
import { getExpensesByEventId, createExpense, deleteExpense } from '../../services/expenseService';
import { getAllGuests, createGuest, deleteGuest } from '../../services/guestService';
import Modal from '../Modal/Modal';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import GuestForm from '../GuestForm/GuestForm';
import './GuestList.css';

function GuestList({ eventId }) {
    const [guests, setGuests] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!eventId) return;
            try {
                setLoading(true);
                console.log('🔍 GuestList - EventId recibido:', eventId, 'Tipo:', typeof eventId);
                const [expensesData, guestsData] = await Promise.all([
                    getExpensesByEventId(eventId),
                    getAllGuests()
                ]);
                console.log('💰 Gastos obtenidos para evento', eventId, ':', expensesData);
                setExpenses(expensesData);
                setGuests(guestsData);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId]);

    const participatingGuests = guests.filter(guest => {
        console.log('🔍 Filtrando invitado:', guest.name, 'event_id:', guest.event_id, 'eventId actual:', eventId);
        return String(guest.event_id) === String(eventId);
    });

    const filteredExpenses = expenses.filter(expense => {
        console.log('💰 Filtrando gasto:', expense.description, 'event_id:', expense.event_id, 'eventId actual:', eventId);
        return String(expense.event_id) === String(eventId);
    });

    const getGuestName = (guestId) => {
        const guest = guests.find(g => g.id === guestId);
        return guest ? guest.name : 'Desconocido';
    };

    const handleAddExpenseClick = () => {
        setIsExpenseModalOpen(true);
    };

    const handleCloseExpenseModal = () => {
        setIsExpenseModalOpen(false);
    };

    const handleSaveExpense = async (formData) => {
        try {
            const newExpenseData = {
                ...formData,
                event_id: eventId,
                amount: parseFloat(formData.amount)
            };

            const createdExpense = await createExpense(newExpenseData);

            setExpenses([...expenses, createdExpense]);
            setIsExpenseModalOpen(false);
            alert('Gasto agregado exitosamente');
        } catch (error) {
            console.error('Error al guardar gasto:', error);
            alert('Error al guardar el gasto');
        }
    };

    const handleAddGuestClick = () => {
        setIsGuestModalOpen(true);
    };

    const handleCloseGuestModal = () => {
        setIsGuestModalOpen(false);
    };

    const handleSaveGuest = async (formData) => {
        try {
            const newGuestData = {
                ...formData,
                event_id: parseInt(eventId)
            };

            const createdGuest = await createGuest(newGuestData);

            setGuests([...guests, { ...createdGuest, event_id: parseInt(eventId) }]);
            setIsGuestModalOpen(false);
            alert('Invitado agregado exitosamente');
        } catch (error) {
            console.error('Error al guardar invitado:', error);
            alert('Error al guardar el invitado');
        }
    };

    const handleDeleteGuest = async (guestId) => {
        if (window.confirm('¿Estás seguro de eliminar este invitado?')) {
            try {
                await deleteGuest(guestId);
                setGuests(guests.filter(guest => guest.id !== guestId));
            } catch (error) {
                console.error('Error al eliminar invitado:', error);
                alert('Error al eliminar el invitado');
            }
        }
    };

    const handleDeleteExpense = async (expenseId) => {
        if (window.confirm('¿Estás seguro de eliminar este gasto?')) {
            try {
                await deleteExpense(expenseId);
                setExpenses(expenses.filter(expense => expense.id !== expenseId));
            } catch (error) {
                console.error('Error al eliminar gasto:', error);
                alert('Error al eliminar el gasto');
            }
        }
    };

    const totalCost = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
    const costPerPerson = participatingGuests.length > 0 ? totalCost / participatingGuests.length : 0;

    if (loading) return <p>Cargando invitados y gastos...</p>;

    return (
        <>
            <div className="guests-section">
                <h2>👥 Invitados</h2>
                <table className="guest-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Alias</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participatingGuests.map(guest => (
                            <tr key={guest.id}>
                                <td>{guest.name}</td>
                                <td>{guest.alias || '-'}</td>
                                <td className="actions-cell">
                                    <div className="actions-container">
                                        <button
                                            className="icon-button delete-guest-btn"
                                            title="Eliminar"
                                            onClick={() => handleDeleteGuest(guest.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="add-guest-button" onClick={handleAddGuestClick}>
                    + Agregar Invitado
                </button>
            </div>

            <div className="expenses-section">
                <h2>💰 Gastos</h2>
                <table className="guest-table">
                    <thead>
                        <tr>
                            <th>Comprador</th>
                            <th>Item</th>
                            <th>Costo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map(expense => (
                            <tr key={expense.id}>
                                <td>{getGuestName(expense.guest_id)}</td>
                                <td>{expense.description}</td>
                                <td className="amount-column">${expense.amount}</td>
                                <td className="actions-cell">
                                    <div className="actions-container">
                                        {/* <button className="icon-button edit-guest-btn" title="Editar">Editar</button> */}
                                        <button
                                            className="icon-button delete-guest-btn"
                                            title="Eliminar"
                                            onClick={() => handleDeleteExpense(expense.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="add-guest-button" onClick={handleAddExpenseClick}>
                    + Agregar Gasto
                </button>

                <div className="totals-section">
                    <h3>Total de la compra: ${totalCost}</h3>
                    <p>Cada uno: ${costPerPerson.toFixed(2)}</p>
                </div>
            </div>

            <Modal isOpen={isExpenseModalOpen} onClose={handleCloseExpenseModal}>
                <ExpenseForm
                    onSubmit={handleSaveExpense}
                    onCancel={handleCloseExpenseModal}
                    guests={participatingGuests}
                />
            </Modal>

            <Modal isOpen={isGuestModalOpen} onClose={handleCloseGuestModal}>
                <GuestForm
                    onSubmit={handleSaveGuest}
                    onCancel={handleCloseGuestModal}
                />
            </Modal>
        </>
    );
}

export default GuestList;
