from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import cohere

class ActionHealthQuery(Action):

    def name(self):
        return "action_health_query"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict):

        user_message = tracker.latest_message.get("text")

        co = cohere.Client("ITE0ibNUnZ3QNdj9VlRoBfnudS8SXS4wCtitYprx")

        try:
            response = co.chat(
                model="command-r-plus",
                message=user_message,
                max_tokens=300,   # allow flexibility
                temperature=0.7,  # more natural responses
                preamble=(
                    "You are a helpful and friendly AI health assistant. "
                    "Keep your answers short when the user greets or asks simple questions, "
                    "but provide longer and detailed answers when they describe health symptoms. "
                    "Always be empathetic, informative, and avoid saying 'I don't understand'. "
                    "Remind users to consult a doctor when necessary."
                )
            )

            bot_reply = response.text.strip()
            dispatcher.utter_message(text=bot_reply)

        except Exception as e:
            dispatcher.utter_message(text=f"⚠️ Error with Cohere API: {e}")

        return []
