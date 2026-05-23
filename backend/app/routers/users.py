from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.schemas import UserCreate
from app.models import User
import bcrypt
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.database import SessionLocal
from app import models, schemas
from app.auth import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token,
    oauth2_scheme
)

router = APIRouter(
    tags=["Users"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")

def register(user: UserCreate, db: Session = Depends(get_db)):
    email = user.email.lower().strip()

    existing_user = db.query(User).filter(
        User.email == email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="You already have an account. Please login."
        )

    hashed_password = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    )

    new_user = User(
       email=email,
        password=hashed_password.decode("utf-8")
    )

    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    email = form_data.username.lower().strip()

    db_user = db.query(models.User).filter(
        models.User.email == email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email"
        )

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
@router.post("/google-login")
def google_login(
    user: schemas.GoogleUser,
    db: Session = Depends(get_db)
):
    email = user.email.lower().strip()

    existing_user = db.query(User).filter(
        User.email == email
    ).first()

    if existing_user:

        access_token = create_access_token(
            data={"sub": existing_user.email}
        )

        return {
            "access_token": access_token,
            "user": {
                "name": existing_user.username,
                "email": existing_user.email
            }
        }

    hashed_password = hash_password("google_user")

    new_user = User(
        username=user.name,
        email=email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(
        data={"sub": new_user.email}
    )

    return {
        "access_token": access_token,
        "user": {
            "name": new_user.username,
            "email": new_user.email
        }
    }

@router.get("/profile")
def get_profile(
    token: str = Depends(oauth2_scheme)
):
    email = verify_token(token)

    if email is None:
        return {"error": "Invalid token"}

    return {
        "message": "Protected route accessed",
        "user_email": email
    }
@router.delete("/delete-account")
def delete_account(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    current_user = verify_token(token)

    email = current_user

    user = db.query(models.User).filter(
        models.User.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    try:

        db.query(models.Expense).filter(
            models.Expense.user_id == user.id
        ).delete()

        db.query(models.Income).filter(
            models.Income.user_id == user.id
        ).delete()

        db.delete(user)

        db.commit()

        return {
            "message": "Account deleted successfully"
        }

    except Exception as e:

        db.rollback()

        print(e)

        raise HTTPException(
            status_code=500,
            detail="Failed to delete account"
        )