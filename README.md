Markdown
# 🤖 Image-Audio-to-Video Batch Automator

Este projeto é uma automação robusta desenvolvida em Node.js para transformar coleções de imagens estáticas e ficheiros de áudio em vídeos MP4 de forma sequencial e automática. Ele foi desenhado para processar grandes volumes de ficheiros, mantendo a organização através de uma lógica de emparelhamento numérico.

## 🌟 Diferenciais desta Versão

* **Processamento em Lote (Batch):** Processa múltiplos ficheiros automaticamente em sequência, sem intervenção manual.
* **Lógica de Emparelhamento:** Une ficheiros baseando-se no nome numérico (ex: `1.jpeg` + `1.mp3` resultam em `1.mp4`).
* **Correção Inteligente de Escala:** Inclui o filtro de vídeo `-vf scale=trunc(iw/2)*2:trunc(ih/2)*2` para garantir que as dimensões da imagem sejam sempre divisíveis por 2, evitando erros comuns do codec H.264.
* **Otimização de Áudio:** Utiliza `audioCodec('copy')` para preservar a fidelidade original do áudio e acelerar o processo, evitando a re-codificação desnecessária.
* **Sincronização Automática:** O parâmetro `-shortest` garante que o vídeo tenha exatamente a mesma duração do ficheiro de áudio.

---

## 📋 Pré-requisitos

Antes de iniciar, precisará de ter:

1.  **Node.js** (versão 12.x ou superior).
2.  **FFmpeg** instalado e configurado nas variáveis de ambiente (PATH) do seu sistema operativo.
3.  As pastas de entrada e saída criadas na raiz do projeto.

---

## 📂 Estrutura de Pastas Obrigatória

Para que o script localize os ficheiros corretamente, organize-os seguindo este padrão:

```text
.
├── audio/           # Coloque os seus áudios aqui: 1.mp3, 2.mp3, etc.
├── image/           # Coloque as suas imagens aqui: 1.jpeg, 2.jpeg, etc.
├── video/           # Pasta onde os MP4 finais serão guardados.
├── index.js
├── package.json
└── node_modules/
Nota: O script utiliza uma sequência numérica simples. Certifique-se de que cada imagem tenha o seu par de áudio correspondente com o mesmo número.

🛠️ Configuração e Instalação
Instale as dependências:

Bash
npm install
Prepare os ficheiros:
Coloque as suas imagens em ./image e os seus áudios em ./audio. Renomeie-os para 1.jpeg, 2.jpeg, etc.

Execute a automação:

Bash
npm start
📝 Detalhes Técnicos do Script
Filtro de Escala
Muitas imagens possuem resoluções ímpares (ex: 1081px), o que causa erro no codec libx264. O nosso script aplica uma fórmula matemática que arredonda a largura e a altura para o número par mais próximo, garantindo que o processo nunca falhe por incompatibilidade de resolução.

Fluxo de Trabalho
O script lê a pasta /image para determinar o total de ciclos.

Utiliza Async/Await e Promises para garantir que um vídeo só comece a ser processado após a conclusão do anterior, evitando sobrecarga de CPU/RAM.

Logs em tempo real no terminal informam o progresso de cada par (ex: [1/50] Concluído).

⚖️ Licença
Este software está licenciado sob a GNU General Public License v2.0 (GPL-2.0).

Tem a liberdade de executar, estudar, partilhar e modificar o software, desde que as modificações também sejam distribuídas sob a mesma licença. Consulte os termos da GPL-2.0 para mais detalhes.

Desenvolvido para automatizar o fluxo de trabalho de criadores de conteúdo. 🚀