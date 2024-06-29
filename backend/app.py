from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

messages = []  # In-memory storage for messages

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@socketio.on('sendMessage')
def handle_message(data):
    message = data['message']
    print('Received message:', message)
    messages.append({'message': message})  # Store the message
    socketio.emit('receiveMessage', {'message': message})

@socketio.on('showMessage')
def handle_show_message(data):
    for msg in messages:
        socketio.emit('receiveMessage', msg, room=request.sid)  # Emit to the requesting user only

if __name__ == '__main__':
    socketio.run(app)


