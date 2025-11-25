import { Router } from 'express';
import * as guestController from '../controllers/guestController';

const router = Router();

router.get('/', guestController.getAllGuests);
router.get('/:id', guestController.getGuestById);
router.post('/', guestController.createGuest);
router.put('/:id', guestController.updateGuest);
router.delete('/:id', guestController.deleteGuest);

export default router;
