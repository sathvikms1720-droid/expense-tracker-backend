from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.database import Base


class Expense(Base):

    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    amount = Column(Float)

    category = Column(String)

    user_id = Column(Integer)

    created_at = Column(DateTime, default=datetime.utcnow)

class Income(Base):

    __tablename__ = "income"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    amount = Column(Float)

    category = Column(String)

    user_id = Column(Integer)

    created_at = Column(DateTime, default=datetime.utcnow)
class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True)

    email = Column(String, unique=True, index=True)

    password = Column(String)