const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const Terser = require('terser');

const jsDir = path.join(__dirname, '../src/css/js');
const distDir = path.join(__dirname, '../dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

async function minifyJS() {
  const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));

  for (const file of files) {
    const filePath = path.join(jsDir, file);
    const code = fs.readFileSync(filePath, 'utf8');

    try {
      const result = await Terser.minify(code, {
        compress: true,
        mangle: true,
        format: {
          comments: false,
        },
      });

      const minifiedPath = path.join(distDir, file);
      fs.writeFileSync(minifiedPath, result.code);
      console.log(`✅ Minified: ${file}`);
    } catch (error) {
      console.error(`❌ Error minifying ${file}:`, error);
    }
  }
}

minifyJS();