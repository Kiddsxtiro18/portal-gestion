const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
    // Coordenadas
    const URL_S = 'https://gvmwdqwkcacgzkfincz.supabase.co';
    const KEY_S = 'sb_publishable_N_hTBW7We2gtuT6b9xYgAA_trx0pI_w';
    const supabase = createClient(URL_S, KEY_S);

    try {
        const { nombre, mensaje } = req.body;
        const ip = req.headers['x-forwarded-for'] || 'IP_Oculta';

        // Intentamos la inserción
        const { data, error } = await supabase
            .from('visitas')
            .insert([{ 
                Usuario_input: `${nombre} - ${mensaje}`, 
                User_ip: ip 
            }]);

        // Si Supabase devuelve un error, lo enviamos al frontend
        if (error) {
            return res.status(400).json({ success: false, error: error.message });
        }

        return res.status(200).json({ success: true });

    } catch (err) {
        // Error de ejecución del servidor
        return res.status(500).json({ success: false, error: "Fallo de servidor: " + err.message });
    }
};
