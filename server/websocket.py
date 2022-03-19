import asyncio
import random
import websockets
from events import EVENTS


PORT = 7000


async def server(websocket):

    event = random.choice(EVENTS)
    await asyncio.sleep(random.random() * 10 + 1)
    await websocket.send(event)


async def main():
    async with websockets.serve(server, "localhost", PORT):
        print(f"Started server on http://localhost:{PORT}")
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
