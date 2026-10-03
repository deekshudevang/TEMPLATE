import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicHome = path.join(__dirname, '..', 'public', 'home');

async function optimizeImages() {
  const desktop = path.join(publicHome, 'bg-desktop.png');
  const mobile = path.join(publicHome, 'bg-mobile.png');

  if (fs.existsSync(desktop)) {
    await sharp(desktop).webp({ quality: 80 }).toFile(path.join(publicHome, 'bg-desktop.webp'));
    await sharp(desktop).avif({ quality: 70 }).toFile(path.join(publicHome, 'bg-desktop.avif'));
  }

  if (fs.existsSync(mobile)) {
    await sharp(mobile).webp({ quality: 80 }).toFile(path.join(publicHome, 'bg-mobile.webp'));
    await sharp(mobile).avif({ quality: 70 }).toFile(path.join(publicHome, 'bg-mobile.avif'));
  }
}

optimizeImages().catch(console.error);
