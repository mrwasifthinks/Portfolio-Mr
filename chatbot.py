import google.generativeai as genai
import os

class ChatBot:
    def __init__(self):
        # Initialize Gemini API
        self.api_key = os.environ.get('GOOGLE_API_KEY')
        if not self.api_key:
            raise ValueError("GOOGLE_API_KEY environment variable is not set")
        
        try:
            # Configure the Gemini API
            genai.configure(api_key=self.api_key)
            
            # List available models
            models = genai.list_models()
            model_name = None
            for model in models:
                if 'gemini-pro' in model.name:
                    model_name = model.name
                    break
            
            if not model_name:
                raise ValueError("Gemini Pro model not found in available models")
            
            # Initialize the model
            self.model = genai.GenerativeModel(model_name)
            
        except Exception as e:
            print(f"Error initializing Gemini model: {str(e)}")
            raise
        
        # Detailed portfolio context
        self.portfolio_context = {
            'personal_info': {
                'name': 'Wasif Azim',
                'location': 'West Bengal, India',
                'role': 'Frontend Developer',
                'chatbot_name': 'Zim Flash',
                'portfolio_url': 'https://mrwasif.netlify.app'
            },
            'skills': {
                'frontend': ['HTML', 'CSS', 'JavaScript', 'React'],
                'backend': ['Node.js', 'Python'],
                'design': ['UI/UX Design', 'Video Editing'],
                'other': ['Arduino', 'IoT', 'AI/ML'],
                'tools': ['Canva']
            },
            'projects': [
                {
                    'name': 'AI-Powered Smart Home',
                    'technologies': ['Arduino', 'IoT', 'Python', 'ML'],
                    'features': [
                        'Automated temperature control',
                        'Smart lighting system',
                        'Security monitoring',
                        'Energy usage optimization'
                    ]
                },
                {
                    'name': 'School Management System',
                    'technologies': ['React', 'Node.js', 'MongoDB', 'Express'],
                    'features': [
                        'Student attendance tracking',
                        'Grade management system',
                        'Parent communication portal',
                        'Administrative dashboard'
                    ]
                },
                {
                    'name': 'E-Commerce Platform',
                    'technologies': ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
                    'features': [
                        'Product catalog management',
                        'Secure payment processing',
                        'Order tracking system',
                        'Admin dashboard'
                    ]
                }
            ],
            'education': [
                {
                    'level': 'Secondary Education',
                    'school': 'Sargachi Ramakrishna Mission High School (H.S.)',
                    'period': '2020 - 2025 (Current)',
                    'location': 'Sargachi, Murshidabad, WB, India'
                },
                {
                    'level': 'Primary Education',
                    'school': 'Pranab Bharati',
                    'period': '2013 - 2019',
                    'location': 'Beldanga, Murshidabad, WB, India'
                }
            ],
            'contact': {
                'email': 'your.email@example.com',
                'phone': '9153077332',
                'linkedin': 'https://www.linkedin.com/in/wasif-azim-390a3434a'
            }
        }

    def get_gemini_response(self, user_input):
        if not user_input or not user_input.strip():
            return "I didn't receive any input. Could you please ask a question?"

        try:
            # First, detect if the question is about portfolio/creator/chatbot
            detection_prompt = f"""Determine if this question is about Wasif Azim's portfolio, the Zim Flash chatbot, or Wasif Azim himself: "{user_input}"
            Return only "PORTFOLIO", "PERSONAL", or "GENERAL" as a single word."""
            
            detection = self.model.generate_content(detection_prompt)
            
            if not detection or not detection.text:
                raise Exception("Failed to get response from Gemini API")
            
            if "PORTFOLIO" in detection.text.upper() or "PERSONAL" in detection.text.upper():
                # Portfolio or personal-related response
                prompt = f"""As Zim Flash, respond to: "{user_input}"

                Context about Wasif Azim:
                - Personal: {self.portfolio_context['personal_info']['name']} is a {self.portfolio_context['personal_info']['role']} from {self.portfolio_context['personal_info']['location']}
                - Skills: Frontend ({', '.join(self.portfolio_context['skills']['frontend'])}), 
                         Backend ({', '.join(self.portfolio_context['skills']['backend'])}),
                         Design ({', '.join(self.portfolio_context['skills']['design'])}),
                         Other ({', '.join(self.portfolio_context['skills']['other'])})
                - Projects: {', '.join(project['name'] for project in self.portfolio_context['projects'])}
                - Education: Currently at {self.portfolio_context['education'][0]['school']}

                Additional Instructions:
                1. Be friendly and professional
                2. If asked about projects, provide specific details about technologies and features
                3. If asked about education, mention both current and previous institutions
                4. If asked about contact, provide the appropriate contact method
                5. If unsure, focus on highlighting relevant skills and experiences

                Provide a helpful, informative response about Wasif's portfolio or background."""
            else:
                # General conversation
                prompt = f"""As Zim Flash, respond to: "{user_input}"
                
                Instructions:
                1. Be friendly and professional
                2. Keep responses concise but informative
                3. If the topic relates to technology or development, draw from my knowledge of frontend, backend, or IoT
                4. Maintain a helpful and engaging tone
                
                Provide a natural, conversational response."""

            response = self.model.generate_content(prompt)
            
            if not response or not response.text:
                raise Exception("Failed to get response from Gemini API")
                
            return response.text.strip()
            
        except Exception as e:
            print(f"API Error: {str(e)}")
            return "I apologize, but I'm having trouble generating a response right now. Please try again in a moment."

    def get_response(self, user_input):
        try:
            print(f"\nUser Input: {user_input}")  # Debug log
            response = self.get_gemini_response(user_input)
            print(f"Bot Response: {response}")  # Debug log
            return response
        except Exception as e:
            print(f"Error in get_response: {str(e)}")
            return "I encountered an unexpected error. Please try again later."

if __name__ == "__main__":
    chatbot = ChatBot()
    print("Zim Flash: Hello! I'm your AI assistant. I can help you learn more about Wasif's portfolio and experience. (Type 'quit' to exit)")
    
    while True:
        user_input = input("\nYou: ")
        
        if user_input.lower() == 'quit':
            print("Zim Flash: Goodbye! Have a great day!")
            break
            
        response = chatbot.get_response(user_input)
        print("\nZim Flash:", response)
