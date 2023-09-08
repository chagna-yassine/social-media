import { updateEvent } from '../api';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const sendAlert = async (event) => {


    Swal.fire({
        position: 'top-end',
        text: "message",
        toast: true,
        timer: 4000, // 2 seconds
        showConfirmButton: false,
    });

    updateEvent(event._id);
}