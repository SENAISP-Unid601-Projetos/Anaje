# Levantamento de Requisitos

## Aspectos do Usuário

1. **Eu como administrador quero** realizar agendamentos dos quartos com menor quantidade de erros.
2. **Eu como administrador desejo** fazer reservas evitando duplicações.
3. **Eu como administrador desejo** armazenar informações com menor risco de perda.
4. **Eu como funcionário desejo** ter acesso ao sistema.
5. **Eu como administrador desejo** ver quais quartos estão disponíveis.

## Aspectos do Sistema

### Requisitos Funcionais do Sistema

1. **O sistema deve** permitir ao administrador criar, atualizar e cancelar reservas de quartos, garantindo que não haja conflitos de horário ou duplicações.
2. **O sistema deve** manter um histórico de todas as reservas feitas, incluindo data, hora e usuário que realizou a operação.
3. **O sistema deve** permitir que os funcionários registrem o check-in e check-out dos hóspedes, vinculando essas informações à reserva original.
4. **O sistema deve** permitir que o administrador defina e altere tarifas de quartos com base em diferentes critérios, como temporada, dias da semana ou tipos de quartos.
5. **O sistema deve** permitir a adição de serviços extras (como café da manhã, transporte, etc.) à reserva, com a possibilidade de tarifação separada para cada serviço.
6. **O sistema deve** gerar automaticamente um número de confirmação único para cada reserva, que pode ser usado pelo hóspede e pelos funcionários para consultar e gerenciar a reserva.
7. **O sistema deve** oferecer uma interface de pesquisa avançada, permitindo ao administrador e aos funcionários localizar reservas por nome do hóspede ou número de reserva.
8. **O sistema deve** permitir o bloqueio temporário de quartos para manutenção ou limpeza, tornando-os indisponíveis para reserva durante o período configurado.

### Requisitos Não Funcionais do Sistema

1. **O sistema deve** ser escalável para suportar um aumento no número de reservas durante a alta temporada sem degradação significativa no desempenho.
2. **O sistema deve** ser compatível com dispositivos móveis, garantindo uma experiência responsiva e otimizada para telas menores.
3. **O sistema deve** ser desenvolvido utilizando boas práticas de segurança, prevenindo vulnerabilidades.
4. **O sistema deve** ser modular e extensível, permitindo a fácil adição de novas funcionalidades no futuro sem a necessidade de grandes mudanças no código existente.
