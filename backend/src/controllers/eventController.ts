import { Request, Response } from 'express';
import * as eventModel from '../models/eventModel';

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await eventModel.getEvents();
        res.json(events);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const event = await eventModel.getEventById(id);
        if (!event) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }
        res.json(event);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        const newEvent = await eventModel.createEvent(req.body);
        res.status(201).json(newEvent);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updatedEvent = await eventModel.updateEvent(id, req.body);
        res.json(updatedEvent);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await eventModel.deleteEvent(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
