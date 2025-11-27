import { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm({ onSubmit, onCancel, guests, initialData }) {
    const [formData, setFormData] = useState({
        guest_id: initialData?.guest_id || '',
        description: initialData?.description || '',
        amount: initialData?.amount || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validaciones simples
        if (!formData.guest_id || !formData.description || !formData.amount) {
            alert('Por favor completa todos los campos');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="expense-form-container">
            <h2>{initialData ? 'Editar Gasto' : 'Agregar Nuevo Gasto'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="guest_id">Comprador</label>
                    <select
                        id="guest_id"
                        name="guest_id"
                        value={formData.guest_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un invitado</option>
                        {guests.map(guest => (
                            <option key={guest.id} value={guest.id}>
                                {guest.name} {guest.alias ? `(${guest.alias})` : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">¿Qué compró?</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Ej: Carne, Carbón, Hielo"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Costo ($)</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="cancel-button">
                        Cancelar
                    </button>
                    <button type="submit" className="submit-button">
                        Guardar Gasto
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ExpenseForm;
