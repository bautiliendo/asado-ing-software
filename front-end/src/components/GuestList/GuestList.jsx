import { useState, useEffect } from 'react';
import { getExpensesByEventId, createExpense } from '../../services/expenseService';
import { getAllGuests } from '../../services/guestService';
import Modal from '../Modal/Modal';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import './GuestList.css';

function GuestList({ eventId }) {
    const [guests, setGuests] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

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

            // Actualizar la lista de gastos localmente
            setExpenses([...expenses, createdExpense]);
            setIsExpenseModalOpen(false);
            alert('Gasto agregado exitosamente');
        } catch (error) {
            console.error('Error al guardar gasto:', error);
            alert('Error al guardar el gasto');
        }
    };

    const totalCost = expenses.reduce((total, expense) => total + expense.amount, 0);
    const costPerPerson = guests.length > 0 ? totalCost / guests.length : 0;

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
                        {guests.map(guest => (
                            <tr key={guest.id}>
                                <td>{guest.name}</td>
                                <td>{guest.alias || '-'}</td>
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
                        {expenses.map(expense => (
                            <tr key={expense.id}>
                                <td>{getGuestName(expense.guest_id)}</td>
                                <td>{expense.description}</td>
                                <td className="amount-column">${expense.amount}</td>
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
                    guests={guests}
                />
            </Modal>
        </>
    );
}

export default GuestList;
