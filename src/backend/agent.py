import sys
import base64
from pathlib import Path

# Ensure the project root is on sys.path so `config` is importable
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from langchain_openrouter import ChatOpenRouter
from langchain.messages import HumanMessage
from config import get_settings
from langchain.tools import tool
from typing_extensions import TypedDict,Literal,Annotated
import operator
from langchain.messages import AnyMessage

settings = get_settings()

# model = ChatOpenRouter(model="google/gemma-4-31b-it:free",
#                         api_key=settings.OPENROUTER_API_KEY)

from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key = settings.GEMINI_API_KEY
)

class AgentState(TypedDict):
    video_description: str
    messages: Annotated[list[AnyMessage], operator.add]
    caption:str
    video_link: str
    publish_state: Literal["SCHEDULED","POSTPONDED","CANCEL","REJECTED","PUBLISHED"]

def describe_video(state:AgentState):
    """Describe what's in this video in a paragraph"""

    video_bytes = open(state.video_link, "rb").read()
    video_base64 = base64.b64encode(video_bytes).decode("utf-8")
    mime_type = "video/mp4"

    message = HumanMessage(
        content=[
            {
                "type": "text", 
                "text": "Describe what's in this video in a paragraph."
            },
            {
                "type": "video",
                "base64": video_base64,
                "mime_type": mime_type,
            },
        ]
    )
    response = llm.invoke([message])
    return {
        "video_description": response.content
    }

def generate_captions(state:AgentState):
    """Generate captions for the video"""
    prompt = f"""
    You are a viral content creator. Using the video description: "{state.video_description}", write 4 viral captions for a tiktok video.
    Return the captions in a list of 4 items. 
    """

    response = llm.invoke(prompt)
    return {
        "caption": response 
    }

def upload_meta_ig(state:AgentState):
    """Upload video to Meta and Instagram"""
    
    