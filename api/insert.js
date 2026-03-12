// api/insert.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Solo permitimos peticiones POST
    if (req.method !== 'POST') return res.status(405).send('Método no permitido');

    const URL_S = 'https://gvmwdqwkcacgzkfincz.supabase.co';
    const KEY_S = 'sb_publishable_N_hTBW7We2gtuT6b9xYgAA_trx0pI_w';
    const supabase = createClient(URL_S, KEY_S);

    try {
        const { nombre, mensaje } = req.body;
        
        // El servidor detecta la IP automáticamente (Bypass de Ipify)
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const { error } = await supabase
            .from('visitas')
            .insert([{ 
                Usuario_input: `${nombre} - ${mensaje}`, 
                User_ip: ip 
            }]);

        if (error) throw error;

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
