const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
    // Solo permitimos peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    // Coordenadas del proyecto
    const URL_S = 'https://gvmwdqwkcacgzkfincz.supabase.co';
    const KEY_S = 'sb_publishable_N_hTBW7We2gtuT6b9xYgAA_trx0pI_w';
    const supabase = createClient(URL_S, KEY_S);

    try {
        const { nombre, mensaje } = req.body;
        
        // Captura de IP desde las cabeceras de Vercel (Bypass total)
        const ip = req.headers['x-forwarded-for'] || 'IP_Desconocida';

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
};
