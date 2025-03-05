from google import genai 

class ChatBot:
    def __init__(self):
        # Initialize Gemini API
        self.api_key = "AIzaSyDL8oFmLM0sZfdNQcWaOpQoWPK5FHBQHXE"
        self.client = genai.Client(api_key=self.api_key)
        
        # Detailed portfolio context
        self.portfolio_context = {
            'personal_info': {
                'name': 'Wasif Azim',
                'location': 'West Bengal, India',
                'role': 'Frontend Developer',
                'chatbot_name': 'Zim Flash',
                'portfolio_url': 'https://wasifazim.netlify.app'
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
        try:
            # First, detect if the question is about portfolio/creator/chatbot
            detection_prompt = f"""Determine if this question is about Wasif Azim's portfolio, the Zim Flash chatbot, or Wasif Azim himself: "{user_input}"
            Return only "PORTFOLIO", "PERSONAL", or "GENERAL" as a single word."""
            
            detection = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=detection_prompt
            )
            
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

            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt
            )
            return response.text
            
        except Exception as e:
            print(f"API Error: {str(e)}")
            return "I apologize, but I'm having trouble generating a response. Please try asking your question in a different way."

    def get_response(self, user_input):
        print(f"\nUser Input: {user_input}")  # Debug log
        response = self.get_gemini_response(user_input)
        print(f"Bot Response: {response}")  # Debug log
        return response

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
