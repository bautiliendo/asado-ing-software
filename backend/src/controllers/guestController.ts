import { Request, Response } from 'express';
import * as guestModel from '../models/guestModel';

export const getAllGuests = async (req: Request, res: Response) => {
    try {
        const guests = await guestModel.getGuests();
        res.json(guests);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getGuestById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const guest = await guestModel.getGuestById(id);
        if (!guest) {
            res.status(404).json({ error: 'Guest not found' });
            return;
        }
        res.json(guest);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createGuest = async (req: Request, res: Response) => {
    try {
        const newGuest = await guestModel.createGuest(req.body);
        res.status(201).json(newGuest);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateGuest = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updatedGuest = await guestModel.updateGuest(id, req.body);
        res.json(updatedGuest);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteGuest = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await guestModel.deleteGuest(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
