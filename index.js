const fs = require('fs');
const { minify } = require('html-minifier');
const CleanCSS = require('clean-css');
const path = require('path');

// Caminhos dos arquivos
const htmlInputPath = 'src/index.html'; // Caminho do arquivo HTML original
const htmlOutputPath = 'dist/index.html'; // Caminho para salvar o HTML minificado
const cssInputPath = 'src/css/style.css'; // Caminho do arquivo CSS original
const cssOutputPath = 'dist/css/style.css'; // Caminho para salvar o CSS minificado

// Função para minificar o CSS
function minifyCSS(inputPath, outputPath) {
  fs.readFile(inputPath, 'utf-8', (err, cssData) => {
    if (err) {
      console.error('Erro ao ler o arquivo CSS:', err);
      return;
    }

    const minifiedCss = new CleanCSS().minify(cssData);

    if (minifiedCss.errors.length > 0) {
      console.error('Erro ao minificar CSS:', minifiedCss.errors);
      return;
    }

    fs.writeFile(outputPath, minifiedCss.styles, (err) => {
      if (err) {
        console.error('Erro ao salvar o arquivo CSS minificado:', err);
        return;
      }
      console.log('Arquivo CSS minificado salvo em:', outputPath);
    });
  });
}

// Minificar HTML
fs.readFile(htmlInputPath, 'utf-8', (err, htmlData) => {
  if (err) {
    console.error('Erro ao ler o arquivo HTML:', err);
    return;
  }

  const minifiedHtml = minify(htmlData, {
    collapseWhitespace: true,
    removeComments: true,
    removeAttributeQuotes: true,
    minifyCSS: false, // Deixe falso se o CSS é externo e será tratado separadamente
    minifyJS: true, // Minificar JavaScript embutido
  });

  fs.writeFile(htmlOutputPath, minifiedHtml, (err) => {
    if (err) {
      console.error('Erro ao salvar o arquivo HTML minificado:', err);
      return;
    }
    console.log('Arquivo HTML minificado salvo em:', htmlOutputPath);

    // Minificar CSS após o HTML
    minifyCSS(cssInputPath, cssOutputPath);
  });
});
