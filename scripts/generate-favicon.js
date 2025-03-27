const sharp = require('sharp');

// Create a 32x32 orange square with rounded corners
sharp({
  create: {
    width: 32,
    height: 32,
    channels: 4,
    background: { r: 255, g: 122, b: 0, alpha: 1 }
  }
})
  .composite([{
    input: Buffer.from(
      `<svg width="32" height="32">
        <path d="M8 16 L14 22 L24 10" stroke="white" stroke-width="3" fill="none"/>
      </svg>`
    ),
    top: 0,
    left: 0,
  }])
  .resize(16, 16)
  .toFile('public/favicon.ico')
  .then(() => console.log('Favicon created successfully'))
  .catch(err => console.error('Error creating favicon:', err)); 