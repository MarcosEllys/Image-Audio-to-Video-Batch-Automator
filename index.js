const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

// Configurações de diretórios
const dirImages = './image';
const dirAudios = './audio';
const dirVideos = './video';

/**
 * Função para gerar o vídeo (sua lógica original com a correção de escala)
 */
async function generateVideo(imagePath, audioPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(imagePath)
      .inputOptions(['-loop 1'])
      .input(audioPath)
      .videoCodec('libx264')
      .audioCodec('copy')
      .outputOptions([
        '-shortest',
        '-pix_fmt yuv420p',
        '-tune stillimage',
        '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
      ])
      .fps(24)
      .on('error', (err) => reject(err))
      .on('end', () => resolve())
      .save(outputPath);
  });
}

/**
 * Função principal que gerencia o lote (batch) de arquivos
 */
async function processBatch() {
  try {

    // 2. Lê a quantidade de arquivos na pasta de imagens
    // Filtramos para ignorar arquivos ocultos como .DS_Store
    const files = fs.readdirSync(dirImages).filter(file => !file.startsWith('.'));
    const totalFiles = files.length;

    console.log(`Iniciando processamento de ${totalFiles} arquivos...`);

    // 3. Laço de repetição baseado na sequência numérica
    for (let i = 1; i <= totalFiles; i++) {
      // Ajuste as extensões conforme necessário (.jpeg, .jpg, .png / .mp3)
      const imagePath = path.join(dirImages, `${i}.jpeg`);
      const audioPath = path.join(dirAudios, `${i}.mp3`);
      const outputPath = path.join(dirVideos, `${i}.mp4`);

      console.log(`[${i}/${totalFiles}] Gerando: ${outputPath}...`);

      try {
        await generateVideo(imagePath, audioPath, outputPath);
        console.log(`[${i}/${totalFiles}] Concluído com sucesso.`);
      } catch (err) {
        console.error(`[${i}/${totalFiles}] Erro ao processar o par ${i}:`, err.message);
      }
    }

    console.log('--- Processamento em lote finalizado! ---');

  } catch (error) {
    console.error('Erro crítico no processo:', error);
  }
}

// Executa o robô
processBatch();