import { Request, Response } from 'express';
import * as expenseModel from '../models/expenseModel';

export const getAllExpenses = async (req: Request, res: Response) => {
    try {
        const eventId = req.query.eventId ? parseInt(req.query.eventId as string) : null;
        console.log('🔍 Backend - Query params:', req.query);
        console.log('🔍 Backend - EventId parseado:', eventId, 'Tipo:', typeof eventId);

        if (eventId) {
            const expenses = await expenseModel.getExpensesByEventId(eventId);
            console.log('💰 Backend - Gastos filtrados para evento', eventId, ':', expenses);
            res.json(expenses);
        } else {
            const expenses = await expenseModel.getExpenses();
            console.log('💰 Backend - Todos los gastos:', expenses);
            res.json(expenses);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getExpenseById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const expense = await expenseModel.getExpenseById(id);
        if (!expense) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }
        res.json(expense);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createExpense = async (req: Request, res: Response) => {
    try {
        const newExpense = await expenseModel.createExpense(req.body);
        res.status(201).json(newExpense);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateExpense = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updatedExpense = await expenseModel.updateExpense(id, req.body);
        res.json(updatedExpense);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await expenseModel.deleteExpense(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
