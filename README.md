# Linger

Linger is a platform designed to connect people who are learning different languages like English, Chinese, Spanish, etc. This platform offers real-time video calls, one-on-one messaging, question-answers, social following, and smart recommendations based on user interests.

## Features
- Real-time Communication (WebSocket)
- Video Calls using Mediasoup
- One-on-One Messaging
- User Profiling and Following System
- Question & Answer Posting
- Smart Recommendations using Kafka + Elasticsearch

---

## Prerequisites
- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Java Development Kit (JDK 8 or higher)
- Maven
- PostgreSQL

---

## Getting Started

### Frontend Setup
```bash
cd linger-front
npm install
npx expo start


Database Configuration
Edit the application.properties file in the src/main/resources directory.

spring.datasource.url=jdbc:postgresql://localhost:5432/lingerdb
spring.datasource.username=your_username
spring.datasource.password=your_password
