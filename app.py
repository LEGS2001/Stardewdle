from flask import Flask, render_template, request
import random
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', prueba='prueba')


# TODO: agregar Seasons al crops json e intercambiarlo por el recipe
@app.route('/cropdle')
def cropdle():
    return render_template('cropdle.html')

if __name__ == '__main__':
    app.run(host='192.168.100.45', debug=True)