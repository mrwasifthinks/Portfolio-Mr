import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import ChatBot

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

chatbot = ChatBot()

@app.route('/', methods=['GET'])
def root():
    return jsonify({
        'status': 'online',
        'message': 'Portfolio Chatbot API is running',
        'endpoints': {
            'chat': '/api/chat',
            'health': '/health'
        }
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        response = chatbot.get_response(user_message)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'version': '1.0.0',
        'google_api': 'configured' if os.environ.get('GOOGLE_API_KEY') else 'missing'
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port) 