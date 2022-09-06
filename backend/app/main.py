from fastapi import FastAPI

app = FastAPI(title="Psychological Counselling")


@app.get("/healthcheck")
async def healthcheck():
    return {"status": "alive"}
