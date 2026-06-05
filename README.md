# 🐔 Cross the Road: Chicken - Advanced Edition

Um jogo clássico de travessia, reimaginado com uma arquitetura de software robusta, física dinâmica e mecânicas estratégicas de nível profissional. Este projeto demonstra a aplicação rigorosa de **Clean Code**, **SOLID** e padrões de design modernos.

---

## 🚀 Tecnologias e Inovações

- **Módulos ES6+**: Arquitetura 100% modular e desacoplada.
- **Física Dinâmica**: Sistema de vetores para movimentação e impacto (**Knockback**).
- **Áudio Procedural**: Síntese sonora via **Web Audio API** (sem arquivos externos).
- **Data-Driven Design**: Níveis e configurações definidos via objetos de dados.
- **Persistência**: Sistema de Ranking local via **localStorage**.
- **JSDoc**: Código totalmente documentado e tipado.

---

## 🎮 Mecânicas de Jogo

### 🚦 Sistema de Semáforos
Pressione a tecla **ESPAÇO** para ativar o sinal vermelho. O trânsito para por 3 segundos, permitindo uma travessia segura. Esta ação consome um "Crédito de Sinal".

### 🪙 Economia e Itens
- **Milho (🌽)**: Colete para ganhar **50 pontos** bônus instantaneamente.
- **Moeda (🪙)**: Colete para ganhar **Créditos de Sinal** extras.

### 📈 Progressão de Fases
O jogo possui um sistema de progressão automático. A cada 3 travessias concluídas:
- O nível aumenta (Fase 1 ➔ Fase 2 ➔ Fase 3).
- O layout da pista muda (densidade e tipos de veículos).
- A velocidade base do trânsito aumenta.

### 💥 Física de Impacto (Knockback)
Ao ser atingida, a galinha é arremessada na direção e velocidade do veículo, girando no ar antes de perder uma vida. Durante este estado de impacto, o controle do jogador é temporariamente bloqueado.

---

## 🏗️ Arquitetura e Design Patterns

### 1. **Encapsulamento Forte**
Uso de campos privados do JavaScript (`#`) em todas as classes principais. O estado interno do motor e das entidades é blindado contra interferências externas.

### 2. **Observer Pattern**
A comunicação entre o motor do jogo (`GameEngine`), a interface (UI) e o sistema de áudio é feita via eventos, garantindo que a lógica de jogo nunca precise conhecer detalhes da tela.

### 3. **Polimorfismo e Herança**
Veículos são divididos em subclasses (`Car`, `Truck`, `Motorcycle`), cada uma com suas próprias propriedades físicas (motos são mais rápidas, caminhões são mais longos).

### 4. **Factory Pattern**
A criação de obstáculos é delegada à `VehicleFactory`, facilitando a expansão para novos tipos de veículos no futuro.

---

## 📂 Estrutura do Sistema

```text
/
├── index.html          # UI e Modais (Start/Game Over)
├── style.css           # Estilização Neon e Responsividade
└── src/
    ├── main.js         # Ponto de entrada (Controller)
    ├── core/
    │   ├── game-engine.js   # Cérebro blindado do sistema
    │   ├── renderer.js      # Especialista visual (Canvas)
    │   ├── audio-manager.js # Sintetizador sonoro procedural
    │   ├── input-manager.js # Abstração de controles semânticos
    │   ├── storage-manager.js # Persistência de Ranking
    │   ├── levels.js        # Configurações de fases (Data-driven)
    │   └── event-emitter.js # Implementação do Observer Pattern
    └── entities/
        ├── chicken.js       # Ator com física de vetores
        ├── vehicle.js       # Hierarquia polimórfica de trânsito
        └── collectible.js   # Itens e Bônus
```

---

## 🕹️ Comandos

- **Setas / WASD**: Movimentar a Galinha.
- **Espaço**: Ativar Semáforo (Custo: 1 Crédito).

---

**Desenvolvido com foco em excelência técnica, performance e diversão.** 🚀
