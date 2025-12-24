# Guia de Deploy no Portainer

Existem duas formas principais de subir sua aplicação no Portainer: conectando diretamente com seu repositório Git (GitHub/GitLab) ou enviando uma imagem pronta para o Docker Hub.

## Opção 1: Via Git (Recomendado)
*Ideal se você já tem o código no GitHub.*

1. **No Portainer**:
   - Vá em **Stacks** (no menu lateral esquerdo).
   - Clique em **+ Add stack**.
   - Dê um nome para sua stack (ex: `site-iridologia`).
   - Em "Build method", selecione **Repository**.

2. **Configuração do Repositório**:
   - **Repository URL**: Coloque o link do seu repositório GitHub (ex: `https://github.com/seu-usuario/site_iris_lab.git`).
   - **Branch**: `main` ou `master`.
   - **Compose path**: Mantenha `docker-compose.yml` (já que seu arquivo está na raiz).

3. **Deploy**:
   - Clique em **Deploy the stack**.
   - O Portainer vai clonar o código, ler o `Dockerfile` e o `docker-compose.yml`, construir a imagem e iniciar o container.

---

## Opção 2: Via Docker Registry (Docker Hub)
*Ideal se o Portainer não tiver acesso à internet para clonar o Git ou se quiser usar uma imagem pronta.*

1. **No seu computador (via Terminal)**:
   Você precisa construir a imagem e enviar para o Docker Hub.
   
   ```powershell
   # 1. Login no Docker Hub
   docker login

   # 2. Construir a imagem (substitua 'seu-usuario' pelo seu user do Docker Hub)
   docker build -t seu-usuario/site_iris_lab:latest .

   # 3. Enviar a imagem
   docker push seu-usuario/site_iris_lab:latest
   ```

2. **Ajuste no docker-compose.yml**:
   Antes de subir no Portainer, você precisaria alterar o `docker-compose.yml` para usar a imagem do Hub em vez de construir localmente:
   ```yaml
   services:
     iris-lab:
       image: seu-usuario/site_iris_lab:latest
       # build: .  <-- Remova esta linha
       ...
   ```

3. **No Portainer**:
   - Vá em **Stacks** > **+ Add stack**.
   - Escolha **Web editor**.
   - Cole o conteúdo do seu `docker-compose.yml` modificado.
   - Clique em **Deploy the stack**.

## Verificação
Após o deploy, acesse sua aplicação usando o IP do servidor onde o Portainer está rodando e a porta definida (Ex: `http://ip-do-servidor:8080`).
