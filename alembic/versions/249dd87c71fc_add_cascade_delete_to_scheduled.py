"""add_cascade_delete_to_scheduled

Revision ID: 249dd87c71fc
Revises: cd0657d7aa9a
Create Date: 2026-05-20 01:15:34.826897

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '249dd87c71fc'
down_revision: Union[str, Sequence[str], None] = 'cd0657d7aa9a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_constraint('scheduled_media_asset_id_fkey', 'scheduled', type_='foreignkey')
    op.create_foreign_key('scheduled_media_asset_id_fkey', 'scheduled', 'media_assets', ['media_asset_id'], ['id'], ondelete='CASCADE')


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint('scheduled_media_asset_id_fkey', 'scheduled', type_='foreignkey')
    op.create_foreign_key('scheduled_media_asset_id_fkey', 'scheduled', 'media_assets', ['media_asset_id'], ['id'])
