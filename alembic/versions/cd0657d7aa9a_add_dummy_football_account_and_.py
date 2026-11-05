"""add_dummy_football_account_and_references

Revision ID: cd0657d7aa9a
Revises: a97025065bd0
Create Date: 2026-05-20 00:14:08.532522

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cd0657d7aa9a'
down_revision: Union[str, Sequence[str], None] = 'a97025065bd0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


from sqlalchemy.sql import table, column
from sqlalchemy import String, UUID, Boolean, DateTime
from sqlalchemy.dialects import postgresql
import datetime

# Define table helpers for bulk inserts
accounts_table = table(
    'accounts',
    column('id', sa.UUID),
    column('name', sa.String),
    column('account_handle', sa.String),
    column('brand_guidelines', postgresql.JSONB(astext_type=sa.Text())),
    column('page_access_token', sa.String),
    column('fb_page_id', sa.String),
    column('ig_business_id', sa.String),
    column('timezone', sa.String),
    column('created_at', sa.DateTime),
    column('updated_at', sa.DateTime)
)

media_assets_table = table(
    'media_assets',
    column('id', sa.UUID),
    column('account_id', sa.UUID),
    column('internal_url', sa.String),
    column('external_url', sa.String),
    column('state', sa.Enum('PENDING', 'UPLOADING', 'SUCCESS', 'FAILED', 'RAW', 'ANALYZED', 'CAPTIONED', 'APPROVED', 'SCHEDULED', 'PUBLISHED', name='mediastate')),
    column('media_type', sa.Enum('VIDEO', 'REEL', 'IMAGE', 'STORY', 'POST', name='mediatype')),
    column('ai_vision_summary', sa.String),
    column('created_at', sa.DateTime),
    column('updated_at', sa.DateTime)
)

scheduled_table = table(
    'scheduled',
    column('id', sa.UUID),
    column('account_id', sa.UUID),
    column('media_asset_id', sa.UUID),
    column('caption', sa.String),
    column('meta_post_id', sa.String),
    column('instgram_post_id', sa.String),
    column('state', sa.Enum('PENDING', 'UPLOADING', 'SUCCESS', 'FAILED', 'RAW', 'ANALYZED', 'CAPTIONED', 'APPROVED', 'SCHEDULED', 'PUBLISHED', name='mediastate')),
    column('error_log', sa.String),
    column('status', sa.String),
    column('scheduled_at', sa.DateTime),
    column('post_to_facebook', sa.Boolean),
    column('post_to_instagram', sa.Boolean),
    column('created_at', sa.DateTime),
    column('updated_at', sa.DateTime)
)

ACCOUNT_ID = 'd0b6b0c2-555e-42c2-80ff-27c1b525db8d'
MEDIA_ASSET_ID = 'e5a31a98-8422-4876-b6b8-809930f7b0df'
SCHEDULED_ID = 'fa4b1b36-7c98-4c12-9c7b-8b9a0de5ef12'


def upgrade() -> None:
    """Upgrade schema."""
    # 1. Insert account
    op.bulk_insert(
        accounts_table,
        [
            {
                'id': ACCOUNT_ID,
                'name': 'Ahmed Elkassrawy',
                'account_handle': 'ahmedelkassrawy',
                'brand_guidelines': {
                    "niche": "Football/Soccer Coaching & Analysis",
                    "tone_of_voice": "Energetic, professional, and analytical",
                    "color_palette": {
                        "primary": "#00FF66",
                        "secondary": "#111111",
                        "accent": "#FFFFFF"
                    },
                    "content_pillars": ["Match Analysis", "Tactical Breakdowns", "Training Drills", "Player Spotlight"],
                    "fonts": ["Outfit", "Inter"],
                    "hashtags": ["#football", "#soccer", "#tactics", "#training", "#elkassrawy"]
                },
                'page_access_token': 'dummy_page_access_token_12345',
                'fb_page_id': 'dummy_fb_page_id_12345',
                'ig_business_id': 'dummy_ig_business_id_12345',
                'timezone': 'Africa/Cairo',
                'created_at': datetime.datetime.utcnow(),
                'updated_at': datetime.datetime.utcnow()
            }
        ]
    )

    # 2. Insert media asset referencing the account
    op.bulk_insert(
        media_assets_table,
        [
            {
                'id': MEDIA_ASSET_ID,
                'account_id': ACCOUNT_ID,
                'internal_url': '/static/assets/dummy_football.mp4',
                'external_url': 'https://example.com/assets/dummy_football.mp4',
                'state': 'RAW',
                'media_type': 'VIDEO',
                'ai_vision_summary': 'A video demonstrating advanced football dribbling skills and tactical positioning on a pitch.',
                'created_at': datetime.datetime.utcnow(),
                'updated_at': datetime.datetime.utcnow()
            }
        ]
    )

    # 3. Insert scheduled post referencing the account and media asset
    op.bulk_insert(
        scheduled_table,
        [
            {
                'id': SCHEDULED_ID,
                'account_id': ACCOUNT_ID,
                'media_asset_id': MEDIA_ASSET_ID,
                'caption': 'Mastering the pitch: quick tactical drills to improve your spatial awareness. ⚽ #football #soccer #tactics',
                'meta_post_id': 'dummy_meta_post_id_67890',
                'instgram_post_id': 'dummy_instagram_post_id_67890',
                'state': 'PENDING',
                'error_log': '',
                'status': 'POSTPONED',
                'scheduled_at': datetime.datetime(2026, 6, 1, 18, 0, 0),
                'post_to_facebook': True,
                'post_to_instagram': True,
                'created_at': datetime.datetime.utcnow(),
                'updated_at': datetime.datetime.utcnow()
            }
        ]
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.execute(f"DELETE FROM scheduled WHERE id = '{SCHEDULED_ID}'")
    op.execute(f"DELETE FROM media_assets WHERE id = '{MEDIA_ASSET_ID}'")
    op.execute(f"DELETE FROM accounts WHERE id = '{ACCOUNT_ID}'")

