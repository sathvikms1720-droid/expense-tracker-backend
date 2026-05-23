from pydantic import BaseModel
from datetime import datetime

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class ExpenseResponse(BaseModel):

    id: int
    title: str
    amount: float
    category: str
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
class GoogleUser(BaseModel):
    name: str
    email: str