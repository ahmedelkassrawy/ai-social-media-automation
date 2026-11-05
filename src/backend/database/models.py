from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, Enum
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime as dt
import enum

Base = declarative_base()

class MediaState(enum.Enum):
    PENDING = "PENDING"
    UPLOADING = "UPLOADING"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"
    RAW = "RAW"
    ANALYZED = "ANALYZED"
    CAPTIONED = "CAPTIONED"
    APPROVED = "APPROVED"
    SCHEDULED = "SCHEDULED"
    PUBLISHED = "PUBLISHED"

class MediaType(enum.Enum):
    VIDEO = "VIDEO"
    REELS = "REELS"
    IMAGE = "IMAGE"
    STORY = "STORY"
    POST = "POST"

class Account(Base):
    __tablename__ = "accounts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    account_handle = Column(String)
    brand_guidelines = Column(JSONB)
    page_access_token = Column(String)
    fb_page_id = Column(String)
    ig_business_id = Column(String)
    timezone = Column(String, nullable=True)

    created_at = Column(DateTime, default=dt.now)
    updated_at = Column(DateTime, default=dt.now, onupdate=dt.now)

    assets = relationship("MediaAssets", back_populates="account")
    schedules = relationship("Scheduled", back_populates="account")

class MediaAssets(Base):
    __tablename__ = "media_assets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"))
    internal_url = Column(String)
    external_url = Column(String)
    state = Column(Enum(MediaState), default=MediaState.PENDING)
    media_type = Column(Enum(MediaType))
    ai_vision_summary = Column(String, nullable=True)

    created_at = Column(DateTime, default=dt.now)
    updated_at = Column(DateTime, default=dt.now, onupdate=dt.now)

    account = relationship("Account", back_populates="assets")
    scheduled_entries = relationship("Scheduled", back_populates="asset",
            cascade = "all, delete-orphan")

class Scheduled(Base):
    __tablename__ = "scheduled"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"))
    media_asset_id = Column(UUID(as_uuid=True), ForeignKey("media_assets.id", ondelete="CASCADE"), unique=True)
    media_type = Column(Enum(MediaType), 
                         nullable=False)
    caption = Column(String)
    meta_post_id = Column(String)
    instagram_post_id = Column(String)
    state = Column(Enum(MediaState), default=MediaState.PENDING)
    error_log = Column(String)
    status = Column(String, default="POSTPONED")
    scheduled_at = Column(DateTime, nullable=False)
    post_to_facebook = Column(Boolean, default=True)
    post_to_instagram = Column(Boolean, default=True)

    created_at = Column(DateTime, default=dt.now)
    updated_at = Column(DateTime, default=dt.now, onupdate=dt.now)

    account = relationship("Account", back_populates="schedules")
    asset = relationship("MediaAssets", back_populates="scheduled_entries")
