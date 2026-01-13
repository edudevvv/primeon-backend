# 🚀 Primeon Backend

- **Primeon** é um projeto backend focado em **automação de atendimento via WhatsApp**, utilizando **steps e flows** para criação de jornadas conversacionais estruturadas, escaláveis e integráveis com o WhatsApp Oficial (Cloud API).

- O sistema foi desenvolvido com arquitetura moderna, modular e preparada para crescimento, utilizando **NestJS + TypeScript** e **PostgreSQL**.

> ⚠️ **Status do projeto:** Pausado

> A implementação foi pausada na etapa de integração final com a API oficial do WhatsApp. As principais estruturas do sistema já estão prontas.

---

## 🧠 Objetivo do Projeto

O Primeon tem como objetivo fornecer uma **plataforma backend** capaz de:

- Gerenciar usuários e aplicações
- Criar e organizar fluxos de atendimento (flows)
- Definir steps conversacionais
- Receber e processar eventos do WhatsApp via webhook
- Facilitar integrações futuras com o WhatsApp Cloud API

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** TypeScript  
- **Framework:** NestJS  
- **Banco de Dados:** PostgreSQL  
- **ORM:** Prisma  
- **Arquitetura:** Modular (Domain-oriented)  
- **Integrações:** Webhook WhatsApp (estrutura pronta)

---

## 📦 Funcionalidades Implementadas

⏳ CRUD de Usuários  
✅ CRUD de Aplicações (Apps)  
✅ Sistema de Flows (fluxos de atendimento)  
✅ Webhook do WhatsApp configurado  
✅ Estrutura preparada para integração com WhatsApp Oficial  
✅ Organização modular e escalável  

---

## 🚧 Funcionalidades Parcialmente Implementadas

⚠️ CRUD de Usuários (register, login, me - implementados | delete, update - não implementados)  

---

## ❌ Funcionalidades Não Finalizadas

- Integração completa com a **API Oficial do WhatsApp (Cloud API)**
- Processamento final de mensagens inbound/outbound
- Execução automática de flows em produção

> Apesar disso, toda a base necessária para a integração já está estruturada.

---

## 🗂️ Estrutura do Projeto (Resumo)

```bash
src/
├── apps/
├── auth/
├── common/
├── flows/
├── webhook/
├── whatsapp/
├── app.module.ts
└── main.ts

prisma/
└── schema.prisma
```

---
## Créditos

Desenvolvido de ❤️ por Eduardo
