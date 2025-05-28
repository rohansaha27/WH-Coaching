# Gemini AI Chatbot Setup for WH Coaching

This guide will help you set up the Gemini AI chatbot on your WH Coaching website.

## Current Implementation

The website currently includes a simple chatbot implementation that:

1. Shows a chat button in the bottom right corner of your website
2. Uses your website's favicon as the chat icon
3. Provides basic responses to common questions about coaching services
4. Is fully responsive on all devices

## Upgrading to Google Gemini API (Optional)

The current implementation uses predefined responses. To make it a true AI chatbot with Google's Gemini:

1. **Get a Google AI Studio API Key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a free account with your personal email
   - Generate an API key

2. **Update the Code**:
   - In `src/gemini-chatbot.js`, uncomment the `callGeminiAPI` function at the bottom
   - Replace `YOUR_API_KEY` with your actual Gemini API key
   - Modify the `getGeminiResponse` function to call the Gemini API instead of using predefined responses

3. **Deploy Your Changes**:
   - After updating the code, deploy your website to Vercel again

## Features Implemented

- Custom chatbot in the bottom right corner
- Uses your website's favicon as the chat icon
- Attractive animation to draw attention
- Mobile-responsive design
- Simple chat interface with message history
- Basic predefined responses for common questions

## Customizing the Chatbot

You can customize the chatbot by modifying:

- **Appearance**: Edit `src/gemini-chatbot.css` to change colors, sizes, and animations
- **Behavior**: Edit `src/gemini-chatbot.js` to change how the chatbot responds
- **Predefined Responses**: Modify the `getGeminiResponse` function to add more keyword-based responses

## Protecting Your API Key

If you decide to use the Gemini API:

1. **Never expose your API key in client-side code** for a production site
2. For proper implementation, you should create a server-side API endpoint that calls Gemini
3. Consider using Vercel Edge Functions or Serverless Functions to securely handle API calls

## Troubleshooting

If the chatbot doesn't appear:
1. Check the browser console for any JavaScript errors
2. Ensure all script and CSS files are loading properly
3. Try clearing your browser cache and reloading the page
