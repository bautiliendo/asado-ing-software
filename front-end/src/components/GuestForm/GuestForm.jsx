import { useState } from 'react';
import './GuestForm.css';

function GuestForm({ onSubmit, onCancel, initialData }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        alias: initialData?.alias || ''
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
        if (!formData.name) {
            alert('Por favor ingresa el nombre del invitado');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="guest-form-container">
            <h2>{initialData ? 'Editar Invitado' : 'Agregar Nuevo Invitado'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre del invitado"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="alias">Alias (Opcional)</label>
                    <input
                        type="text"
                        id="alias"
                        name="alias"
                        value={formData.alias}
                        onChange={handleChange}
                        placeholder="Ej: El asador"
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="cancel-button">
                        Cancelar
                    </button>
                    <button type="submit" className="submit-button">
                        Guardar Invitado
                    </button>
                </div>
            </form>
        </div>
    );
}

export default GuestForm;
