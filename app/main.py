from app.routers import users
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.database import engine, SessionLocal
from app import models, schemas
from app.auth import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token,
    oauth2_scheme
)

from app.routers import expenses

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(expenses.router)
app.include_router(users.router)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Expense Tracker API Running"}

