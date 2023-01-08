from fastapi_mail import ConnectionConfig  # type: ignore

conf = ConnectionConfig(
    MAIL_USERNAME="",
    MAIL_PASSWORD="",
    MAIL_FROM="MyCabinet@email.com",
    MAIL_PORT=1025,
    MAIL_SERVER="smtp-server",
    MAIL_FROM_NAME="MyCabinet",
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=False,
    VALIDATE_CERTS=True,
)
