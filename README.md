# 🐔 Cross the Road: Chicken

Um jogo clássico de travessia, reimaginado com uma arquitetura de software robusta, padrões de design modernos e princípios rigorosos de **Clean Code**. O que começou como um script simples evoluiu para uma aplicação modular de nível corporativo.

---

## 🚀 Tecnologias e Conceitos

- **Linguagem:** JavaScript Moderno (ES6+)
- **Interface:** HTML5 Canvas API e CSS3 Custom Properties
- **Áudio:** Web Audio API (Síntese sonora via código)
- **Arquitetura:** Orientação a Objetos (OOP) com Campos Privados
- **Documentação:** JSDoc para tipagem e contratos
- **Performance:** Ciclo de vida baseado em `requestAnimationFrame`

---

## 🏗️ Arquitetura e Design Patterns

O grande diferencial deste projeto não é apenas a jogabilidade, mas a sua **fundação técnica**. Foram aplicados diversos padrões de design para garantir escalabilidade e manutenibilidade:

### 1. **Modularização (ES6 Modules)**

O código é dividido em módulos especializados, eliminando o acoplamento global e facilitando a localização de responsabilidades.

### 2. **Observer Pattern (Desacoplamento de UI)**

Utiliza uma classe `EventEmitter` para que a lógica do jogo se comunique com a interface sem conhecê-la. O jogo emite eventos (`scoreUpdate`, `gameOver`), e a camada de UI reage a eles.

### 3. **Factory Pattern (Criação de Veículos)**

A `VehicleFactory` centraliza a complexidade de instanciar diferentes tipos de obstáculos (`Car`, `Truck`, `Motorcycle`), permitindo expandir o jogo com novos inimigos sem alterar o motor principal.

### 4. **State Pattern (Máquina de Estados)**

Gerenciamento explícito dos estados do jogo (`MENU`, `PLAYING`, `GAME_OVER`), eliminando variáveis booleanas conflitantes e garantindo transições de tela seguras.

### 5. **Input Manager (Abstração de Hardware)**

Uma camada que traduz eventos físicos do teclado em comandos semânticos, permitindo que o jogo suporte futuramente Touch ou Gamepads sem mudanças na lógica interna.

### 6. **Renderer (Separação de Preocupações)**

Toda a interação com a API do Canvas é isolada na classe `Renderer`, deixando a `GameEngine` focada exclusivamente em regras de negócio e física.

### 7. **Data-Driven Design**

As configurações de níveis (`levels.js`) são separadas da lógica do motor, permitindo a criação de novas fases através de simples objetos de dados.

---

## 🔒 Encapsulamento Defensivo

O projeto utiliza a sintaxe moderna de **Campos Privados (`#`)**. Isso garante que o estado interno do jogo (pontuação, vidas, coordenadas) seja inacessível de fora das classes, prevenindo bugs por efeitos colaterais e protegendo a integridade dos dados. O acesso à leitura é feito estritamente através de *getters*.

---

## 🎮 Como Jogar

1. Abra o `index.html` em um servidor local (necessário para suporte a Módulos ES6).
2. Use as **SETAS do teclado** ou as teclas **WASD** para mover a galinha.
3. **Objetivo:** Chegar ao topo da tela (grama verde) para ganhar 10 pontos.
4. **Desafio:** Evite ser atingido pelos carros, caminhões e motos.
5. O jogo termina quando as 5 vidas se esgotam.

---

## 📂 Estrutura do Projeto

```text
/
├── index.html          # Estrutura limpa da aplicação
├── style.css           # Estilização com variáveis e modais
└── src/
    ├── main.js         # Ponto de entrada (Controller/Bootstrap)
    ├── core/
    │   ├── constants.js     # Única fonte de verdade para regras
    │   ├── game-engine.js   # O cérebro blindado do jogo
    │   ├── renderer.js      # Especialista em desenhos gráficos
    │   ├── audio-manager.js # Sintetizador de sons dinâmicos
    │   ├── input-manager.js # Abstração de controles
    │   ├── event-emitter.js # Implementação do Observer Pattern
    │   └── levels.js        # Configurações de fases (Data-driven)
    ├── entities/
    │   ├── chicken.js       # Classe do Jogador
    │   └── vehicle.js       # Hierarquia polimórfica (Car, Truck, Moto)
    └── factories/
        └── vehicle-factory.js # Fábrica de obstáculos
```

---

## 🛠️ Próximos Passos Sugeridos

- [ ] Implementar múltiplos níveis com layouts progressivos.
- [ ] Adicionar suporte a toque para dispositivos móveis.
- [ ] Implementar sistema de "High Score" usando `localStorage`.
- [ ] Adicionar bônus coletáveis na pista.

---

**Desenvolvido com excelência técnica e foco em Engenharia de Software.** 🚀
