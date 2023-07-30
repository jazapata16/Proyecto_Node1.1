// Importa las bibliotecas necesarias
import express from 'express';
import multer from 'multer';



// Configura Multer para gestionar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta de destino para guardar los archivos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png'); // Nombre de archivo único con extensión .png
  },
});

const upload = multer({ storage });

// Crea una instancia del enrutador de Express
const router = express.Router();

// Define el endpoint de carga de imágenes
router.post('/upload', upload.array('photos', 10), (req, res) => {
  try {
    const imageUrls = req.files.map((file) => file.path); // Obtiene las rutas de los archivos guardados en el servidor
    res.json({ urls: imageUrls }); // Devuelve las rutas de las imágenes como respuesta
  } catch (error) {
    console.log('Error al cargar las imágenes:', error);
    res.status(500).json({ message: 'Error al cargar las imágenes' });
  }
});

// Exporta el enrutador
export default router;
