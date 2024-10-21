# Speech-to-Text Web Application

## Overview

This Speech-to-Text Web Application is designed to convert spoken words into written text in real-time using modern web technologies and advanced cloud services. The project offers hands-on experience with full-stack development and incorporates powerful APIs like Google Cloud Speech-to-Text for accurate speech recognition.

## Key Features

- **Real-Time Speech Recognition:** Converts spoken words into text using the Google Cloud Speech-to-Text API.
- **User Authentication:** JWT-based authentication for user management and speech history.
- **Speech History & Export:** Save and export speech-to-text sessions in .txt or .csv formats using MongoDB.
- **Error Handling:** Alerts for unsupported browsers and API errors, with optional audio/text file storage on AWS S3 or Google Cloud Storage.
- **Responsive Design:** Built with React.js and Next.js, ensuring a dynamic user interface with Tailwind CSS.
- **Real-Time Collaboration:** Multiple users can collaborate on speech-to-text sessions.
- **Natural Language Processing (NLP):** Integrates TensorFlow.js for features such as grammar correction and keyword extraction.

## Technical Stack

- **Front-End:** React.js, Next.js, Tailwind CSS
- **Back-End:** Node.js, Express
- **Database:** MongoDB
- **Cloud Services:** Google Cloud Speech-to-Text API, AWS S3 or Google Cloud Storage
- **Real-Time Functionality:** Socket.io
- **Testing & Deployment:** Jest, Cypress, GitHub Actions, Vercel (front-end), Heroku/Docker (back-end)